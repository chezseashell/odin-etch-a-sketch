const cols = 16;
const startBTN = document.getElementById('start-btn');


function createGrid(cols) {
    const container = document.getElementById('container');
    container.innerHTML = '';

    const divSize = `calc((100% - ${(cols - 1) * 2}px) / ${cols})`;

    for (let i = 0; i < cols * cols; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.style.width = divSize;
        container.appendChild(gridItem);
    };

    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
    item.addEventListener('mouseover', function() {

      this.style.backgroundColor = 'lightgray';
      // Remove transition after first hover so color stays
      this.style.transition = 'none';
    });
  });
 }   

 createGrid(16)

  startBTN.addEventListener('click', function() {
        
        let newGridCol = prompt("Please indicate number of squares per side in new game");
    
        container.innerHTML = '';
        if (newGridCol >= 1 && newGridCol <= 100) {
            createGrid(newGridCol);
          } else {
            alert('Please enter values between 1 and 50');
          }
    })

