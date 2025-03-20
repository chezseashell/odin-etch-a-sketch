
/*     Popup functionality     */

export function prompt( { title = '', message = '', icon = 'none', defaultText = '', okButtonText = 'START NEW GAME', cancelButtonText = 'Cancel', onOkButtonClick = function() {}, onCancelButtonClick = function() {} }) {
  const html = `
    <dialog class="dialog">
        <div class="dialog_header">
       <span class="dialog_icon ">!</span>
            <div class="dialog_title">${title}</div>
            <button class="dialog_close">&times</button>
        </div>
        <div class="dialog_content">
            ${message}
            <input type="text" class="dialog_input" maxlength="3" autofocus>
            <i></i>
        </div>
        <div class="dialog_footer">
            <button class="dialog_button js-dialog_button_cancel">${cancelButtonText}</button>
            <button class="dialog_button dialog_button--outline js-dialog_button_ok">${okButtonText}</button>

        </div>
    </dialog>
  `

  const template = document.createElement('template')
  template.innerHTML = html
  const dialog = template.content.querySelector('.dialog')
  const btnClose = template.content.querySelector('.dialog_close')
  const btnOk = template.content.querySelector('.js-dialog_button_ok')
  const btnCancel = template.content.querySelector('.js-dialog_button_cancel')
  const input = template.content.querySelector('.dialog_input')
  
  input.value = defaultText

  input.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' && input.value.trim() !== '') { // Check for Enter and non-empty input
          event.preventDefault(); // Prevent default form submission behavior
          onOkButtonClick(input.value); // Trigger the OK callback
          close(dialog); // Close the dialog
      }
  });

  btnClose.addEventListener('click', () => {
    onCancelButtonClick()
    close(dialog)
  })

  btnOk.addEventListener('click', () => {
    onOkButtonClick(input.value)
    close(dialog)
  })

  btnCancel.addEventListener('click', () => {
    onCancelButtonClick()
    close(dialog)
  })





  document.body.appendChild(template.content)

  dialog.showModal()

  

}

function close(dialog) {
  dialog.classList.add('close')
  dialog.addEventListener('animationend', () => {
      document.body.removeChild(dialog)
  })
}






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
  prompt({ 
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

