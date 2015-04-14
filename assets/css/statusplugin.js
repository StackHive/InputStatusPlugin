(function() {
    StatusPlugin = (function() {
        function StatusPlugin($input) {
            this.inputElement = $input;
            this.currentValue = this.inputElement.val();
            this.build();
            this.bindEvents();
        }
        StatusPlugin.prototype.UpdateValue = function(val) {
            if (typeof val === "undefined") val = this.inputElement.val();
            this.currentValue = val;
        }
        StatusPlugin.prototype.build = function() {
            this.inputElement.after('<a class="status_btn saved" title="Changes Applied"><i class="fa fa-check-circle"></i></a> <a class="status_btn unsaved" style="display:none;" title="Revert to saved value"><i class="fa fa-times-circle"></i></a>')
            this.inputElement.parent().addClass('relative-container');
        };

        StatusPlugin.prototype.Saved = function() {
            this.inputElement.siblings('.status_btn.unsaved').hide("slide", {
                direction: "down"
            }, 100);
            this.inputElement.siblings('.status_btn.saved').show("slide", {
                direction: "top"
            }, 100);

        };
        StatusPlugin.prototype.Restore = function() {
            this.inputElement.val(this.currentValue);
            this.Saved();
        }
        StatusPlugin.prototype.Changed = function() {
            this.inputElement.siblings('.status_btn.unsaved').show("slide", {
                direction: "down"
            }, 100);
            this.inputElement.siblings('.status_btn.saved').hide("slide", {
                direction: "top"
            }, 100);
        }
        StatusPlugin.prototype.bindEvents = function() {
            var _this = this;
            this.inputElement.on('keyup keydown', function() {
                if (_this.inputElement.val() == _this.currentValue) {
                    _this.Saved();
                    _this.UpdateValue()
                } else {
                    _this.Changed();
                }
            }).on('change', function() {
                _this.Saved();
                _this.UpdateValue()
            }).on('StatusPlugin:UpdateValue', function() {
                _this.UpdateValue();
            });

            this.inputElement.siblings('.status_btn.unsaved').find('*').andSelf().on('mousedown', function(event) {
                event.preventDefault();
                event.stopPropagation();
                _this.Restore();
            });

        };

        return StatusPlugin;

    })();

}).call(this);

/**
 * Attaching Input Status Plugin 
 */
$(function() {
    //Load Initial Values
    $("#heading").val($.trim($("#jumboheading").text())).on('change', function() {
        $("#jumboheading").html($.trim($(this).val()));
    });
    $("#title").val($.trim($("head").find("title").text())).on('change', function() {
        $("head").find("title").html($.trim($(this).val()));
    });;
    $(".with_status").each(function() {
        var statusplugin = new StatusPlugin($(this));
        $(this).data('plugin', statusplugin);
    });
})