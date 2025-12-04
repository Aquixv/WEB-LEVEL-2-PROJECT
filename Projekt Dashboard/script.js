import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
  import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCV2oi-v6yUr_riCe_iDZrCyAz-rm8EbSM",
    authDomain: "aquii-fb-2.firebaseapp.com",
    projectId: "aquii-fb-2",
    databaseURL: "https://aquii-fb-2-default-rtdb.firebaseio.com",
    storageBucket: "aquii-fb-2.firebasestorage.app",
    messagingSenderId: "9930879852",
    appId: "1:9930879852:web:41125e02e899c23f833949"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app);

  onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user);
                const sanitizeEmailKey = (email) => {
    if (!email) return null;
    return email.replace(/\./g, ',').replace(/@/g, '-');
};
        const userEmail = user.email;
    const sanitizedEmail = sanitizeEmailKey(userEmail);
    const db = getDatabase();
    const userRef = ref(db, 'allUsers/' + sanitizedEmail);
    get(userRef).then((snapshot) => {
        if (!snapshot.exists()) {
            console.log("New login detected. Creating default profile...");
            set(userRef, {
                email: userEmail,
                displayName: user.displayName || userEmail.split('@')[0],
                dateCreated: new Date().toLocaleDateString(),
                totalRecycled: 0,
                currentStreak: 0, 
            });
            } else {
            console.log("Existing profile found.");
        }
    }).catch((error) => {
        console.error("Error accessing database for profile check:", error);
    });
        userprofile.innerHTML += `
        <img src ="${user.photoURL}" alt= "DP" width='100'
        style = "border-radius:100%"/>
        <h3>${user.displayName}</h3>`
        redmi.innerHTML += `${user.displayName}`
    } else{
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1000)
        }
    }
  );
  const signout = () => {
signOut(auth).then(() => {
    console.log('user is signed out');
    setTimeout(() => {
        window.location.href = 'index.html'
    }, 1000)
}).catch((error) => {
    //an error happened.
});
}
window.signout = signout;











const dashboardData = {
    currentStreak: 14,
    totalRecycled: "1,540 kg",
    metrics: { 
        plasticRecycled: 70, 
        paperRecycled: 30, 
        monthlyData: [120, 150, 130, 180, 160] // Mock data for charts
    }
};

const pageContentDiv = document.getElementById('page-content');
const navLinks = document.querySelectorAll('.sidebar a');

// --- 2. NEW PAGE TEMPLATES ---

// A. Welcome Template (Simple Greeting)
const welcomeTemplate = `
    <header class="dashboard-header" style="background:none; box-shadow:none;">
        <h1 style="font-size: 2.5rem;">Welcome back, <span id="redmi"></span>!</h1>
    </header>
    <div class="kpi-card" style="padding: 40px;">
        <p style="font-size: 1.5rem; margin-bottom: 15px; color: var(--color-light-text);">
            Your current recycling streak is <span style="color: var(--color-accent-green); font-weight: 700;">${dashboardData.currentStreak} days</span>!
        </p>
        <p style="font-size: 1.1rem; color: #b0d9b0;">
            Keep up the incredible work. Head over to the Metrics page to see your progress or the Tracker to log your next recycle run.
        </p>
    </div>
`;

// B. Metrics Template (Charts Ready for Chart.js)
const metricsTemplate = `
    <header class="dashboard-header" style="background:none; box-shadow:none;">
        <h1>Your Recycling Metrics</h1>
    </header>
    <div class="content-grid" style="grid-template-columns: 2fr 1fr;">
        
        <div class="kpi-card" style="grid-column: 1/2; height: 350px;">
            <h2>Monthly Recycling Trend (kg)</h2>
            <canvas id="monthlyTrendChart"></canvas>
        </div>

        <div class="kpi-card" style="grid-column: 2/3;">
            <h2>Material Breakdown</h2>
            <div style="height: 250px;">
                <canvas id="materialBreakdownChart"></canvas>
            </div>
            <p style="text-align:center; font-size:0.9rem; color:#b0d9b0; margin-top:15px;">
                Total Recycled: ${dashboardData.totalRecycled}
            </p>
        </div>

        <div class="kpi-card" style="grid-column: 1/3; text-align:center;">
            <h2>Weekly Activity Heatmap (Placeholder)</h2>
            <p style="color:#b0d9b0;">
                (This is where the GitHub-style calendar would go, populated by a function.)
            </p>
        </div>
    </div>
`;

// C. Recycling Tracker Template (MODIFIED FOR DESKTOP WIDTH)
const trackerTemplate = ` <div class="new" style= "display:flex; justify-content:center;"> 
    <h1 style="font-size: 2.5rem; color: var(--color-light-text); text-align: center;">What are you recycling today?</h1>
    
    <div class="kpi-card tracker-form-card"> 
        <p style="color: #b0d9b0; margin-bottom: 30px;">Select your material and estimate the quantity to track your environmental impact.</p>
        
        <form id="recycle-log-form">
            <div class="input-group">
                <label for="material" style="color:var(--color-light-text);">Material Type</label>
                <select id="material" name="material" required 
                    style="width: 100%; padding: 15px; border-radius: 8px; background-color: var(--color-dark-base); color: var(--color-light-text); border: 1px solid var(--color-dark-base); font-size: 1rem; box-shadow: inset 0 1px 3px rgba(0,0,0,0.4);">
                    <option value="plastic">Plastic</option>
                    <option value="paper">Paper/Cardboard</option>
                    <option value="glass">Glass</option>
                    <option value="metal">Metal (Cans/Foil)</option>
                </select>
            </div>

            <div class="input-group">
                <label for="weight" style="color:var(--color-light-text);">Estimated Weight (kg)</label>
                <input type="number"  placeholder="1-25kg" id="weight" name="weight" min="0.1" max="25" step="0.1" required 
                    style="padding: 15px; border-radius: 8px; background-color: var(--color-dark-base); color: var(--color-light-text); border: 1px solid var(--color-dark-base); font-size: 1rem; box-shadow: inset 0 1px 3px rgba(0,0,0,0.4);">
            </div>
            <div class="input-group2" style="display: flex; justify-content: center;">
            <button type="submit" class="eco-button primary-btn" style="width: 40%; margin-top: 30px; padding: 15px; background-color: #388E3C; border:none;  border-radius: 5px;">
                Recycle <i class="fas fa-recycle recycle-icon"></i>
            </button>
            </div>
        </form>
        <p id="log-message" style="margin-top: 20px; color: var(--color-accent-green);"></p>
    </div>
    </div>
`;


// D. Settings Template (Quick inclusion for nav menu)
const settingsTemplate = `
    <header class="dashboard-header" style="background:none; box-shadow:none;">
        <h1>Account Settings</h1>
    </header>
    <div class="kpi-card" style="padding: 40px;">
        <p style="color: #b0d9b0;">
            Manage your profile, notification preferences, and privacy settings here.
        </p>
    </div>
    <button class="signout-btn" onclick="signout()"><a href="#" data-page="logout"><i class="fas fa-sign-out-alt"></i></a></button>
`;


// --- 3. CHART & FUNCTION LOGIC ---

const renderCharts = (data) => {
    // 1. Monthly Trend Chart (Line Chart)
    const ctxMonthly = document.getElementById('monthlyTrendChart');
    if (ctxMonthly) {
        new Chart(ctxMonthly, {
            type: 'line',
            data: {
                labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
                datasets: [{
                    label: 'Recycling (kg)',
                    data: data.monthlyData,
                    borderColor: 'var(--color-accent-green)',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(76, 175, 80, 0.1)', // Light fill
                }]
            },
            options: { maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
        });
    }

    // 2. Material Breakdown Chart (Doughnut Chart)
    const ctxBreakdown = document.getElementById('materialBreakdownChart');
    if (ctxBreakdown) {
        new Chart(ctxBreakdown, {
            type: 'doughnut',
            data: {
                labels: ['Plastic', 'Paper/Cardboard'],
                datasets: [{
                    data: [data.plasticRecycled, data.paperRecycled],
                    backgroundColor: ['var(--color-accent-green)', 'var(--color-warm-accent)'],
                    hoverOffset: 8
                }]
            }
        });
    }
};

const handleTrackerForm = () => {
    const form = document.getElementById('recycle-log-form');
    const message = document.getElementById('log-message');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const material = document.getElementById('material').value;
            const weight = document.getElementById('weight').value;
            
            // In a real app, this is where you send data to Firebase
            // db.collection("recycling_logs").add({ userId: ..., material, weight, timestamp: new Date() });

            message.textContent = `Thanks for recycling ${weight} kg of ${material}, Let's make the earth liveable again 🌍`;
            form.reset();
        const obj = {
        itemrecycled: material,
    quantity: weight,
        time:new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
    }
      const dbRef =  ref(database, 'allUsers')
  set(dbRef, obj)

    console.log(obj)
        });
    }
};



const loadPage = (pageName) => {
    let template = '';
    let loadFunction = null;

    if (pageName === 'welcome') {
        template = welcomeTemplate;
    } else if (pageName === 'metrics') {
        template = metricsTemplate;
        // The charts need to be rendered after the canvas elements load
        loadFunction = () => { renderCharts(dashboardData.metrics); }; 
    } else if (pageName === 'tracker') {
        template = trackerTemplate;
        loadFunction = handleTrackerForm; 
    } else if (pageName === 'settings') {
        template = settingsTemplate;
    } 
    // Removed old 'inventory', 'finance' logic

    pageContentDiv.className = pageName === 'welcome' ? '' : 'content-grid'; // Use grid for data pages
    pageContentDiv.innerHTML = template;

    if (loadFunction) {
        setTimeout(loadFunction, 0); 
    }
};

// --- 5. INITIALIZATION ---
// ... (Keep existing event listeners for navLinks) ...

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.parentElement.classList.remove('active'));
        e.currentTarget.parentElement.classList.add('active');
        const page = e.currentTarget.getAttribute('data-page');
        loadPage(page);
    });
});

// Load the initial welcome page when the script starts
// Note: We need Chart.js included in the HTML for this to work!
loadPage('welcome');