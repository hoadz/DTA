export default function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [ day,month,year].join('/');
};


 // console.log("11",moment().year(2021).month(11).date(24).lunar().format('YYYY-MM-DD'));
      // console.log("22",moment().year(2021).month(10).date(21).solar().format('YYYY-MM-DD'));
      