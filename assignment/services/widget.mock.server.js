var WIDGETS = [
  { _id: "100", widgetType: "HEADING", pageId: '3', size: 0, text: "This is a HEADING", url: "http://cnn.com"},
  { _id: "200", widgetType: "IMAGE", pageId: '3' , size: 0, text: "This is a paragraph", url: 'http://lorempixel.com/400/200/'},
  { _id: "300", widgetType: "YOUTUBE", pageId: '3', size: 4, text: "testing 4", url: "https://www.youtube.com/embed/AM2Ivdi9c4E"},
  { _id: "400", widgetType: "HTML", pageId: '3' ,size: 3, text: '<p>I am a <i>HTML</i>, haha :)</p>'},
  { _id: "500", widgetType: "TEXT", pageId: '3' ,size: 4, text: 'Some Text',
    formatted: true},
];

module.exports = WIDGETS;
