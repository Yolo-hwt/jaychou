function timestampToDate(timestamp) {
    const dateobj = new Date(timestamp);
    const year = dateobj.getFullYear();
    const mounth = (dateobj.getMonth() + 1 < 10 ? '0' + (dateobj.getMonth() + 1) : dateobj.getMonth() + 1);
    const day = (dateobj.getDate() < 10 ? '0' + (dateobj.getDate()) : dateobj.getDate()) + '';
    return [year, mounth, day].join('-')
}
export default {
    timestampToDate
}