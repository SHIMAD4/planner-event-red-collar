export default function closeModal(e) {
    console.log(e.target.classList[0])
    if(e.target.classList[0] !== 'event__title') {
        if(e.target.classList[0] === 'modal__close-icon' || e.target.classList[0] === 'modal__bg') {
            document.querySelector('.modal').classList.remove('active')
        }
    } else {
        document.querySelector('.modal').classList.add('active')
    }
}