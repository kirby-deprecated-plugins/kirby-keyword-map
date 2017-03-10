# Kirby Keyword Map

*Version 0.3*

See SEO keywords in your text as a map.

*This plugin has nothing to to do with the meta keywords tag. It's keywords inside your texts that are targeted.*

![](docs/screenshot.png)

**Features**

- Support for structure fields
- Support for multiple keyword maps
- Support for mutiple words in a keyword phrase
- Support for multi languages
- Highlights both keywords in tags and text.
- Will ignore these characters `['-', '#', ',', '.']`

[**Installation instructions**](docs/install.md)

## Setup

This plugin is a panel field and to use it you need to add a blueprint field. You also need a field that has a textarea.

```
fields:
  mytext:
    label: My text
    type: textarea
  keywordmap:
    label: Keyword Map
    type: keywordmap
    target: mytext
```

### A field with a textarea

In this case we call our textarea field `mytext` but you can call it anything.

### A field with a `keywordmap` field

Our new field has two required options:

- `type` needs to be `keywordmap`
- `target` needs to be a field that contains a textarea, in this case it's `mytext`.

## Usage

### Add keywords

Click on the top of the field to keyword phrases. Both single and multiple words are allowed in a single keyword phrase. 

![](docs/tags.png)

### Write text

![](docs/text.png)

### Results

See screenshot on top to see the results.

## Changelog

**0.3**

- Added word counters.
- Minor css fixes.

**0.2**

- Fixed major bug that made the field not work with a single language installation.
- Remove value in console.log.
- Color a keyword tab if it's in the text.

**0.1**

- Initial release 

## Requirements

- [**Kirby**](https://getkirby.com/) 2.4.1+

## Disclaimer

This plugin is provided "as is" with no guarantee. Use it at your own risk and always test it yourself before using it in a production environment. If you find any issues, please [create a new issue](https://github.com/jenstornell/kirby-keyword-map/issues/new).

## License

[MIT](https://opensource.org/licenses/MIT)

It is discouraged to use this plugin in any project that promotes racism, sexism, homophobia, animal abuse, violence or any other form of hate speech.

## Credits

- [Jens Törnell](https://github.com/jenstornell)
- [mark.js](https://markjs.io) - Javascript to hightlight keywords in a text