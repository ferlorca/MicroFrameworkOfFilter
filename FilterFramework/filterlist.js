class FilterList {
    /**
     * constructor
     * @param {$("#multipleFilters")} jquery_combo
     * @param withoutDblDispatch boolean que habilita o 
     */
    constructor(jquery_combo = null, withoutDblDispatch = false) {
        if (jquery_combo) {
            if (jquery_combo instanceof jQuery) {
                this._combo = jquery_combo;
                this._WithDblDispatch = true;
            } else { 
                console.error(`Error en la instanciacion del filterlist...¿Existe el combo en el DOM del html? ¿Se corresponde con un objeto de JQUERY?`);
            }
        } else {
            if (!withoutDblDispatch) {
                this._WithDblDispatch = true;
            } else {
                this._WithDblDispatch = false;
            }
        }
        this.filters = [];
    }

    /*borra todo*/
    delete() {
        this._combo.selectize({})[0].selectize.clear();
        this.filters = new Array();
    }

    /*limpia los campos*/
    clear() {
        var i = this.filters.length;
        while (i >= 0) {
            i--;
            if (i >= 0)
                this.filters[i].clear();
        }

        //for (let filter of this.filters) {
        //    filter.clear();
        //}
    }

    addFilter(filterclass) {
        try {
            if (!this.filters.includes(filterclass)) {
                this.filters.push(filterclass);
            }
            if (this._combo)
                this._combo.html(this.compileHtml())
        } catch (e) {
            console.log(e.message)
        }
    }

    addFixedHeader(...tables) {
        var self = this;
        var sticky = self._combo.offset().top;
        $(window).unbind("resize");
        $(window).unbind("scroll");
        $(window).scroll( function () { self.fixedHeader(tables, sticky) });
        $(window).resize( function () { self.fixedHeader(tables, sticky) });
    }

    fixedHeader(tables,sticky) {
        var header = this._combo;
        if (this._combo)
        if ($(window).width() > 600) {
            if (window.pageYOffset > sticky) {
                //header.setAttribute("style", `width:${$(header).parent().width()}px`);
                header.attr("style", `width:${header.parent().width()}px`);
                header.addClass("floating");
                if (tables)
                    for (let tab of tables)
                        if (!isNullOrEmpty(tab) && $.fn.DataTable.isDataTable(tab)) {
                            let offsettop = header.height() + parseInt(header.css('padding-top')) + parseInt(header.css('padding-bottom'));
                            tab.fixedHeader.headerOffset(offsettop);
                            tab.fixedHeader.adjust();
                        }
            } else {
                header.removeClass("floating");
                header.removeAttr("style");
            }
        } else {
            header.removeClass("floating");
            header.removeAttr("style");
        }
    }

    deleteFilter(filterclass) {
        let index = this.filters.indexOf(filterclass);
        if (index > -1) {
            this.filters.splice(index, 1);
        }
        filterclass = null;
        if (this._combo)
            this._combo.html(this.compileHtml())
    }

    addMultipleFilters(...filters) {
        if (!this._WithDblDispatch) {
            for (let filter of filters) {
                if (this.isAFilter(filter))
                    this.addFilter(filter);
                else {
                    console.error("Hay un error en la carga de filtros.. \n Se estan pasando objetos que no heredan de filter")
                }
            }
        } else {
            for (let filter of filters) {
                if (this.isAFilter(filter)) {
                    filter.addFilterList(this);
                    filter.addToFather();
                    //this.addFilter(filter);
                }
                else {
                    console.error("Hay un error en la carga de filtros.. \n Se estan pasando objetos que no heredan de filter")
                }
            }
        }
    }

    isAFilter(filter) {
        return filter instanceof Filter
    }

    printConsole() {
        console.log(this.filters)
    }

    compileHtml() {
        if ((!this._combo.parent().hasClass("uk-margin-bottom")) && this.filters.length > 0)
            this._combo.parent().addClass("uk-margin-bottom uk-width-1-1")
        let html = "";
        html += "<p>";
        if (this.filters.length > 0) {
            for (let [index, value] of this.filters.entries()) {
                html += value.html;
            }
        }
        html += "</p>";
        return html;
    }

    toJson() {
        //let newjsonObj = new Object();
        let newjsonValues = new Object();
        for (let filter of this.filters) {
            //newjsonObj[filter.id] = filter;
            newjsonValues[filter.id] = filter.value;
        }
        //let obj = new Object();
        //obj["filters"] = newjsonObj;
        //obj["values"] = newjsonValues;
        //return obj;
        return newjsonValues
    }
}
