export function formatDateTimeWIB(date) {
    const waktu = new Date(date).toLocaleString('sv-SE', {
        timeZone: 'Asia/Jakarta',
        hour12: false
    });
    return waktu;
}