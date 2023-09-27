export default function closeModal(e) {
    const eventClassList = e.target.classList
    const modal = document.querySelector('.modal')
    const closeTrigger = eventClassList.contains('modal__close-icon') || eventClassList.contains('modal__bg')
    const openTrigger = eventClassList.contains('event__title')

    if(!openTrigger && closeTrigger) {
        modal.classList.remove('active')
    } else {
        modal.classList.add('active')
    }
}