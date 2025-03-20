
export function prompt( { title = '', message = '', icon = 'none', defaultText = '', okButtonText = 'START NEW GAME', cancelButtonText = 'Cancel', onOkButtonClick = function() {}, onCancelButtonClick = function() {} }) {
    const html = `
      <dialog class="dialog">
          <div class="dialog_header">
          ${icon != 'none' ? `<span class="dialog_icon icon-${icon}"></span>` : '' }
              <div class="dialog_title">${title}</div>
              <button class="dialog_close icon-subtract"></button>
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