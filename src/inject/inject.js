/* Place your Open AI Key here for GPT-3 usage */
const OPENAI_KEY = `place-your-openai-api-key-here`;

/* Advanced Options */
const INPUT_AREA_SELECTOR = `.DraftEditor-root .DraftEditor-editorContainer`;
const PREVIOUS_TWEET_SELECTOR = `div[data-testid="tweetText"][lang]`;
const REPLY_MODAL_SELECTOR = `div[role=group].r-1habvwh`;
const TEXT_INPUT_SELECTOR = `[contenteditable="true"]`;
const debug = false;

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		// console.log("Hello. This message was sent from scripts/inject.js", $);
		// ----------------------------------------------------------

		function getPreviousTweetText() {
			return $(`${ REPLY_MODAL_SELECTOR } ${ PREVIOUS_TWEET_SELECTOR }`).text();
		}

		function generateTweet(mood = '', isThread = false, addendum = '') {
			var text = getPreviousTweetText();
			if (debug) console.log('input:', text);
			let url = `https://gpt3.serv.rs/?input=${ encodeURIComponent(text) }&mood=${ encodeURIComponent(mood) || '' }`;
			if (OPENAI_KEY) url += `&apiKey=${ encodeURIComponent(OPENAI_KEY) }`;
			if (addendum) url += `&addendum=${ encodeURIComponent(addendum) }`;
			if (isThread) url += '&thread=1';

			$.get(url, function (data) {
				if (data.response) {
					if (debug) console.log('reply:', data.response);

					document.querySelector(`${ REPLY_MODAL_SELECTOR } ${ TEXT_INPUT_SELECTOR }`).focus();

					if (document.querySelector(`${ REPLY_MODAL_SELECTOR } ${ TEXT_INPUT_SELECTOR }`).innerText !== '\n') {

						var area = document.querySelector(`${ REPLY_MODAL_SELECTOR } ${ TEXT_INPUT_SELECTOR }`);
					    var range = document.createRange();
					    range.selectNode(area);
					    window.getSelection().addRange(range);

						document.execCommand('selectAll', false, null);
						document.execCommand('cut');
					}

					setTimeout(() => { document.execCommand('insertText', false, data.response) }, 99);
				}
			});
		}

		setInterval(() => {
			if (!$('.refresh').length) {
				const $reply_input_area = $(`${ REPLY_MODAL_SELECTOR } ${ INPUT_AREA_SELECTOR }`);
				$reply_input_area.append(`<div class="refresh robot" title="vanilla robot" style="position: absolute;right: 245px;top: -0px;cursor: pointer; background: #15202B">🤖</div>`);
				$('.refresh.robot').click(() => generateTweet());

				$reply_input_area.append(`<div class="refresh encouraging" title="robot tries to make you feel better" style="position: absolute;right: 220px;top: -0px;cursor: pointer; background: #15202B">👍</div>`);
				$('.refresh.encouraging').click(() => generateTweet('encouraging'));

				$reply_input_area.append(`<div class="refresh grin" title="robot make funny" style="position: absolute;right: 195px;top: -0px;cursor: pointer; background: #15202B">😹</div>`);
				$('.refresh.grin').click(() => generateTweet('funny'));

				$reply_input_area.append(`<div class="refresh wacky" title="robot tries to be really funny" style="position: absolute;right: 170px;top: -0px;cursor: pointer; background: #15202B">🤣</div>`);
				$('.refresh.wacky').click(() => generateTweet('really funny, wacky'));

				$reply_input_area.append(`<div class="refresh ridiculous" title="robot tries to write a ridiculous reply" style="position: absolute;right: 145px;top: -0px;cursor: pointer; background: #15202B">🤪</div>`);
				$('.refresh.ridiculous').click(() => generateTweet('completely ridiculous'));

				$reply_input_area.append(`<div class="refresh sad" title="sad bot is sad" style="position: absolute;right: 120px;top: -0px;cursor: pointer; background: #15202B">😭</div>`);
				$('.refresh.sad').click(() => generateTweet('sad'));

				$reply_input_area.append(`<div class="refresh teenager" title="robot replies, but is an angsty teenager" style="position: absolute;right: 95px;top: -0px;cursor: pointer; background: #15202B">👦</div>`);
				$('.refresh.teenager').click(() => generateTweet('', 0, 'in the voice of an angsty teenager'));

				$reply_input_area.append(`<div class="refresh sarcastic" title="AI somewhat understands sarcasm" style="position: absolute;right: 70px;top: -0px;cursor: pointer; background: #15202B">🙃</div>`);
				$('.refresh.sarcastic').click(() => generateTweet('sarcastic & witty'));

				$reply_input_area.append(`<div class="refresh angry" title="you wont like my when I'm mad" style="position: absolute;right: 45px;top: -0px;cursor: pointer; background: #15202B">😡</div>`);
				$('.refresh.angry').click(() => generateTweet('angry'));

				$reply_input_area.append(`<div class="refresh helpful" title="robot tries to help" style="position: absolute;right: 20px;top: -2px;cursor: pointer; background: #15202B">🙌</div>`);
				$('.refresh.helpful').click(() => generateTweet('helpful'));

				// Doesn't insert text correctly
				// $reply_input_area.append(`<div class="refresh thread" title="Twitter Thread" style="position: absolute;right: 0px;top: -0px;cursor: pointer; background: #15202B">🧵</div>`);
				// $('.refresh.thread').click(() => generateTweet(null, 1));
			}

			if (document.querySelector(`${ REPLY_MODAL_SELECTOR } ${ TEXT_INPUT_SELECTOR }`) && document.querySelector(`${ REPLY_MODAL_SELECTOR } ${ TEXT_INPUT_SELECTOR }`).innerText !== '\n') {
				$('.refresh').hide();
			} else {
				$('.refresh').show();
			}

		}, 222);

	}
	}, 10);
});
