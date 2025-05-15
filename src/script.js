// Create CodeMirror instance
var sourceArea = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: "application/json",
    theme: "eclipse",
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    indent: true
});

var targetArea = CodeMirror.fromTextArea(document.getElementById("result"), {
    mode: "application/json",
    theme: "eclipse",
    lineNumbers: true,
    matchBrackets: true,
    readOnly: true
});

// Set example JSON
sourceArea.setValue(`{'created by timerring': 'https://github.com/timerring', 'description': 'Where there is a will', 'result': 'there is a way', 'properties': {'kinda beautiful': 1, 'And every night has its day': 'so magical', 'And if there is love in this life': 'there is no obstacle'}}`);

// Format button click event
$('.format-btn').click(function() {
    try {
        let source = sourceArea.getValue();
        let jsonObj = JSON.parse(source.replace(/'/g, '"'));
        let formatted = JSON.stringify(jsonObj, null, parseInt($("#TabSize").val()));
        targetArea.setValue(formatted);
    } catch (e) {
        alert('Please input the correct JSON format!');
    }
});

// Indentation change event
$("#TabSize").change(function() {
    if (targetArea.getValue()) {
        try {
            let jsonObj = JSON.parse(targetArea.getValue());
            let formatted = JSON.stringify(jsonObj, null, parseInt($(this).val()));
            targetArea.setValue(formatted);
        } catch (e) {}
    }
});

// Expand/Collapse level button click event
$('.tab-btn').click(function() {
    let level = $(this).text().replace(/[^0-9]/g, '');
    if (level) {
        $("#TabSize").val(level).trigger('change');
    }
});