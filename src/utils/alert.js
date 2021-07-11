import swal from 'sweetalert2'
export default {
    async success(msg, title = 'OK') {
        await swal.fire({
            icon: 'success',
            title: title,
            text: msg,
            confirmButtonColor: '#17a673',
            cancelButtonColor: '#a75050',
            reverseButtons: true
        })
    },
    async error(msg) {
        await swal.fire({
            icon: 'error',
            title: 'Oops',
            text: msg,
            confirmButtonColor: '#17a673',
            cancelButtonColor: '#a75050',
            reverseButtons: true
        })
    },
    async withTimeout(msg, timeout = 1000) {
        await swal.fire({
            html: `<p><b>${msg}</b></p>`,
            timer: timeout,
            onOpen: () => {
                swal.showLoading()
            },
            onClose: () => {
                return
            }
        })
    },
    async confirm(msg, confirmText, cancelText, title = 'Alerta') {
        return swal.fire({
            title: title,
            text: msg,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#17a673',
            cancelButtonColor: '#a75050',
            cancelButtonText: cancelText,
            confirmButtonText: confirmText,
            reverseButtons: true
        }).then((result) => {
            return result.value
        }).catch(() => {
            return false
        })
    },
    async input(title, type, confirmText = '') {
        let config = {
            title: title,
            input: type,
            reverseButtons: true,
            confirmButtonColor: '#17a673',
        }

        if (confirmText) {
            config.confirmButtonText = confirmText
        }

        return swal.fire(config)
    },
    async html(title, html, icon) {
        return swal.fire({
            icon: icon,
            title: title,
            html: html,
            confirmButtonColor: '#17a673',
            reverseButtons: true
        })
    }
}
