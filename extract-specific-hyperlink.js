// ==UserScript==
// @name        Extract Specific Hyperlink
// @namespace   extract-specific-hyperlink
// @author      Guilherme Trevisan 2020-01-15
// @description     A simple way to automatically copy links to the clipboard based on a condition
// @homepage    https://github.com/TrevisanGMW
// @supportURL  https://github.com/TrevisanGMW
// @license     MIT
// @include     *
// @require     https://code.jquery.com/jquery-3.1.1.min.js
// @version     1.0
// @grant       none
// @run-at document-end
// ==/UserScript==

var closeWindowCapturingLink = true;
var timeBeforeClosingWindowMS = 1000;

// Condition to consider URL found
var regex_list = [
	/^http(s)?:\/\/(www\.)?turbobit.net/i
    //^http(s)?:\/\/(www\.)?ul.to/i
];

// Copy parameter to clipboard
function executeCopy (text) {
  let input = document.createElement('textarea')
  document.body.appendChild(input)
  input.value = text
  input.select()
  document.execCommand('copy')
  input.remove()
}


// Main
var i, j;

for (i = 0; i < document.links.length; i++) {
	var link = document.links[i];

	for (j = 0; j < regex_list.length; j++) {
		var match = link.href.match(regex_list[j]);

		if (match != null) {
            executeCopy(link) // Copies found link to clipboard
            if (closeWindowCapturingLink == true) {
                setTimeout(() => {
                    window.close();
                }, timeBeforeClosingWindowMS)
            }

			break;
		}
	}
}