/* se utiliza solo el input no se snecesita especificar el plugins */
class FilterTypeDateRange extends Filter {
    constructor(jquery_combo, dat1 = null, dat2 = null) {
        super(jquery_combo);
        this._date1 = dat1;
        this._date2 = dat2;
        this.applyEvent();
        this._fechaDefecto = this.combo.parent().parent().find(".fechaPorDefecto");
    }

    applyEvent() {
        let self = this._self;
        this.combo.unbind("datepicker-change");
        this.combo.dateRangePicker(self.configDateRangePicker()).bind('datepicker-change', function (event, obj) {
            if (obj != undefined) {
                self.date1 = moment(obj.date1, 'DD-MM-YYYY').format("DD-MM-YYYY");
                self.date2 = moment(obj.date2, 'DD-MM-YYYY').format("DD-MM-YYYY");
                self.value = obj.value;
                self.text = obj.value;
                self.addToFather();
            } else {
                let auxdates = self.combo.val().split("al");
                if (auxdates.length != 1) {
                    self.date1 = auxdates[0];
                    self.date2 = auxdates[1];
                    self.value = self.combo.val();
                    self.text = self.combo.val();
                    self.addToFather();
                }
            }
        });
        //evento para cuando se escribe la fecha
        this.combo.change(function () {
            let auxdates = self.combo.val().split("al");
            if (auxdates.length != 1) {
                self.date1 = auxdates[0].trim();
                self.date2 = auxdates[1].trim();
                self.value = self.combo.val();
                self.text = self.combo.val();
                self.addToFather();
            } else {
                self.date1 = "";
                self.date2 = "";
                self.value = ""; 
                self.text = "";
                self.addToFather();
            }
        });
    }

    applyDefaultDate() {
        this._fechaDefecto.click();
    }

    change() {
        if (!isNullOrEmpty(this.date1) && !isNullOrEmpty(this.date2)) {
            this.combo.data('dateRangePicker').setDateRange(this.date1, this.date2);
        } else {
            this._fechaDefecto.click();
        }
        this.combo.trigger("datepicker-change");
    }

    selectValue(date1, date2) {
        if (!isNullOrEmpty(date1) && !isNullOrEmpty(date2)) {
            this.date1 = date1.trim();
            this.date2 = date2.trim();
            this.change();
        } else {
            console.error("No se pueden setear fechas nulas o vacias")
        }   
    }

   configDateRangePicker() {
        return {
                format: 'DD-MM-YYYY',
                language: 'es',
                separator: ' al ',
                monthSelect: true,
                yearSelect: true,
                getValue: function () {
                    return $(this).val();
                }
            }
    }

    get date1() {
        return this._date1;
    }
    get date2() {
        return this._date2;
    }
    set date1(date) {
        this._date1 = date;
    }
    set date2(date) {
        this._date2 = date;
    }

    disable() {
        var element = this.combo;
        localStorage.setItem(this.id + "date1", this.date1);   
        localStorage.setItem(this.id + "date2", this.date2);   
        element.prop('disabled', true);
        this.date1 = "";
        this.date2 = "";
        this.value = "";
        this.text = "";
        this.combo.val("");
        this.addToFather();
        element.parent().siblings().first().children().first().addClass("uk-text-muted");
        element.parent().siblings(".uk-grid-collapse").children().each(function () {
            $(this).addClass('disabled');
            $(this).removeClass("md-btn-accent")
        });
    }

    enable() {
        var element = this.combo;
        element.prop('disabled', false);
        if (localStorage.getItem(this.id + "date1")) {
            this.date1 = localStorage.getItem(this.id + "date1");
            this.date2 = localStorage.getItem(this.id + "date2");
            this.change();
        } else {
            this.change();
        }
        element.parent().siblings().first().children().first().removeClass("uk-text-muted");
        element.parent().siblings(".uk-grid-collapse").children().each(function () {
            $(this).addClass("md-btn-accent");
            $(this).removeClass('disabled')
        });       
    }

    clear() {
        this._fechaDefecto.click();
    }
}
