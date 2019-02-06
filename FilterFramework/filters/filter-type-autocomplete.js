

class FilterTypeAutocomplete extends Filter {
    constructor(jquery_combo, url, successResponseFunc) {
        super(jquery_combo);
        this._url = url;
        this.label = this.combo.find("label").html();
        //this._vItem = vItem;
        this._successResponseFunc = successResponseFunc;
        this.aplicarAutocomplete();
        this.applyEvent();
    }

    applyEvent() {
        let self = this;
        this._combo.unbind("selectitem.uk.autocomplete");
        this._combo.on('selectitem.uk.autocomplete', function (event, data) {
            /*change dom values*/
            self._setValue(data.id, data.value);
        });
        this.combo.keypress(function (e) {
            if (e.which == 8 || e.which == 0 || e.which == 13) {
               acreedor.setValue("", "")
            }
        })
    }

    change(func = "null") {
        if (func) {
            this._change = func;
        }
    }

    /**
     * /
     * @param {any} id   -> lo que viaja por el request
     * @param {any} descript -> lo que se muestra en el combo
     */
    _setValue(id, descript) {
        this.combo.find("input").val(descript); 
        this.value = id;
        this.text = descript;
        this.addToFather();
        if (this._change != null && this._change != undefined) {
            this._change();
        }
    }

    selectValue(id,descript) {
        $(this).find("input").val(descript); 
        this._setValue(id, descript);
    }

    disable() {
        $(this).find("input").attr("disabled", "disabled");
    }

    enable() {
        $(this).find("input").removeAttr("disabled");
    }

    clear() {
        this.combo.find("input").val("");
        this._setValue("", "");
    }

    aplicarAutocomplete() {
        var _self = this;
        $.UIkit.autocomplete(_self.combo, {
            source: function (response) {
                $.ajax({
                    url: _self._url,
                    data: { query: this.value },
                    dataType: 'json',
                    type: 'POST',
                    success: function (data) {
                        response($.map(data, _self._successResponseFunc));
                    },
                    error: function (e) {
                        console.log(e);
                    }
                })
            },
            minLength: 5,
        });
    }
}
