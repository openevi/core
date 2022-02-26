const pad = document.getElementById('pad')
const writing = document.getElementById('writing')
const render = document.getElementById('render')
const symbols = {'>': '<blockquote> </blockquote>', '*': '<b> </b>', '_': '<em> </em>', '~': '<del> </del>', '--': '<underlined> </underlined>', '<empty/>': ' ', '|': '<h1> </h1>', '-': '<square><li> </li></square>', '.': '<li> </li>', '+': '<check><input> </check>', '=': '<ol> </ol>'}
let textarea = document.getElementById('keylistener')
let div, lines, opened, closed, replacements, start, finish, selection, select
var parsed_line, replacement

function make_input_checkboxes() {
    document.querySelectorAll('check input').forEach(el => {
        el.setAttribute('type', 'checkbox')
    })
}

function load() {
    console.log(textarea.value)
    lines = textarea.value.split('\n')
    writing.innerHTML = parse_line(lines[lines.length - 1])
    parse_text(textarea.value)
    textarea.focus()
}

function add_syntax(text_with_syntax, text_to_replace, from, to) {
    console.log(text_with_syntax)
    console.log(textarea.value.substring(0, from), textarea.value.substring(to, textarea.length))
    textarea.value = textarea.value.substring(0, from) + text_with_syntax + textarea.value.substring(to, textarea.length)
    textarea.focus()
    select = document.selection.createRange()
    select.text = selection
}

function get_selected_text() {
    start = textarea.selectionStart
    finish = textarea.selectionEnd
    selection = textarea.value.substring(start, finish)
    if (selection === '') {
        start = textarea.value.length
        finish = textarea.value.length
        textarea.value += '<empty/>'
        selection = '<empty/>'
    }
    return selection, start, finish
}

function parse_line(line) {
    parsed_line = line
    for (const symbol of Object.keys(symbols)) {
        replacements = symbols[symbol].split(' ')
        opened = replacements[0]
        closed = replacements[1]
        parsed_line = parsed_line.replaceAll('\\' + symbol, closed)
        parsed_line = parsed_line.replaceAll(symbol, opened)
    }
    return parsed_line
}

function parse_text(text) {
    lines = text.split('\n')
    lines.pop(lines.length - 1)
    render.innerHTML = ''
    render.appendChild(writing)
    for (const line of lines) {
        parsed_line = parse_line(line)
        div = document.createElement('div')
        div.setAttribute('class', 'line')
        div.innerHTML = parsed_line
        render.insertBefore(div, writing)
    }
    make_input_checkboxes()
}

function parse_keys(event) {
    // console.log(event)
    if (event.altKey) {
        selection, start, finish = get_selected_text()
        // console.log(selection, start, finish)
        switch (event.key) {
            case "b":
                replacement = `*${selection}\\*`
                add_syntax(replacement, selection, start, finish)
                break
            case "i":
                replacement = `_${selection}\\_`
                add_syntax(replacement, selection, start, finish)
                break
            case "c":
                replacement = `~${selection}\\~`
                add_syntax(replacement, selection, start, finish)
                break
            case "u":
                replacement = `--${selection}\\--`
                add_syntax(replacement, selection, start, finish)
                break
            case "q":
                replacement = `>${selection}\\>`
                add_syntax(replacement, selection, start, finish)
                break
            case "l":
                replacement = `-${selection}\\-`
                add_syntax(replacement, selection, start, finish)
                break
            case "t":
                replacement = `|${selection}\\|`
                add_syntax(replacement, selection, start, finish)
                break
        }
    }
    lines = textarea.value.split('\n')
    writing.innerHTML = parse_line(lines[lines.length - 1])
    parse_text(textarea.value)
}

window.addEventListener('keyup', parse_keys)

window.addEventListener('load', load)
