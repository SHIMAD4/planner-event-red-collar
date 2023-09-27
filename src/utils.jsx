export default function closeModal(e) {
    const modal = document.querySelector('.modal')
    const eventClassList = e.target.classList
    
    if(modal !== null && modal !== undefined) {
        const closeTrigger = eventClassList.contains('modal__close-icon') || eventClassList.contains('modal__bg')
        const openTrigger = eventClassList.contains('event__title')
        if(!openTrigger && closeTrigger) {
            modal.classList.remove('active')
        } else {
            modal.classList.add('active')
        }
    }
}