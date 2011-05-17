(function(window, undefined) {
	var document = window.document, $ = window.jQuery;
	$.fn.getWindow = function() {
		if (this[0].nodeName.toLowerCase() === 'iframe') {
			return this[0].contentWindow;
		}
		// return false;
		return window;
	};
	$.fn.getDocument = function() {
		/*
		 * if (this[0].nodeName.toLowerCase() === 'iframe') { return
		 * this[0].contentWindow.document; } return false;
		 */
		return this.getWindow().document;
	};
	$.fn.getBody = function() {
		return this.getDocument().body;
	};
	$.fn.yEditor = function() {
		var content = this.val() ? this.val() : this.html();
		var iframe = $('<iframe frameborder=0>' + '</iframe>');
		$(this).after(iframe);
		var idoc = iframe.getDocument();
		idoc.designMode = "on";
		idoc.open();
		idoc.write('<!DOCTYPE html>' + '<html>' + '<head></head>'
				+ '<body></body>' + '</html>');
		idoc.close();
		var idoc = iframe.getDocument();
		var body = iframe.getBody();
		$(body).html(content);

		iframe.width(this.outerWidth());
		iframe.height(this.outerHeight());
		this.hide();
		return iframe;
	};
	$.fn.viewSource = function() {
		var $body = $(this.getBody());
		$body.text($body.html());
		return this;
	};
	$.fn.viewHtml = function() {
		var $body = $(this.getBody());
		$body.html($body.text());
		return this;
	};
	$.fn.print = function() {
		this.getWindow().print();
	};
	$.fn.execCommand = function(sCommand, bUserInterface, vValue) {
		this.getDocument().execCommand(sCommand, bUserInterface, vValue);
	};
}(window));