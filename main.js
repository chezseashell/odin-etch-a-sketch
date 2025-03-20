import * as popups from './popups/popups.js'

const cols = 16;
const showPrompt = document.querySelector('#showPrompt');

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






showPrompt.addEventListener('click', () => {
  popups.prompt({ 
      title: 'Input Required', 
      message:'Please type your desired number of squares per side to start a new game and reset grid.', 
      icon: 'alert1', 
      defaultText: '', 
      OkButtonText: 'START NEW GAME', 
      cancelButtonText: 'CANCEL',
      onOkButtonClick: function(inputValue) {
        const gridSize = parseInt(inputValue); // Convert string to number
        if (!isNaN(gridSize) && gridSize > 0) {
            createGrid(gridSize); // Recreate grid with new size
        } else {
            console.log('Please enter a valid number');
        }
    },
    onCancelButtonClick: function() {
        console.log('Cancel Button Clicked!');
    }
});
});

