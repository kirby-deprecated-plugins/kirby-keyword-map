<?php
class KeywordmapField extends TagsField {
	static public $fieldname = 'keywordmap';
	static public $assets = array(
		'js' => array(
			'dist/script.min.js',
		),
		'css' => array(
			'style.min.css',
		)
	);

	public function __construct() {
		$this->separator = ',';
		$this->lower = true;
	}

	public function input() {
		if(site()->language()) {
			$lang = site()->language()->code();
			$content = $this->page->content($lang)->get($this->name())->value();
		} else {
			$content = $this->page->content()->get($this->name())->value();
		}

		$input = parent::input();
		$input->attr['value'] = (!empty($content)) ? $input->attr['value'] : '';
		$input->addClass('keywordmap-tags');
		
		$html = tpl::load( __DIR__ . DS . 'template.php', $data = array(
			'field' => $this,
			'page' => $this->page()
		));
		return $input . $html;
	}

	public function element() {
		$element = parent::element();
		$element->data('field', self::$fieldname);
		if(isset($this->target)) {
			$element->data('target', $this->target);
		}
		return $element;
	}
}