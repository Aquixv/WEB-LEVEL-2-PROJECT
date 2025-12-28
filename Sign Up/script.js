    //   let regexString = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    //     const confirmEmail = regexString.test(userObj.mail)
    //     if (confirmEmail) {
    //         const found = allUsers.find(user => user.mail === userObj.mail)
    //         if (found) {
    //             alert('account already exists')
    //         } else {
    //             signUpButton.innerHTML = `
    //                     <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
    //                     <span role="status">Loading...</span>
    //             `
    //             allUsers.push(userObj)
    //             localStorage.setItem('facebuukUsers', JSON.stringify(allUsers))
    //             setTimeout(()=>{
    //                 window.location.href = "../Projekt Dashboard/index.html"
    //             }, 2000)
    //         }
    //     }