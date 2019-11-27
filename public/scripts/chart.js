
 function myFunction() {
    
    let removeButtons = [...document.querySelectorAll('.removeMovie')]
    removeButtons.forEach(val => {
  
        val.addEventListener('click', function() {
          console.log( `movie to remove ${val.dataset.movie}`)
        })
    })
  }



  module.exports = myFunction;