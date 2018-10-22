(function ($) {
    "use strict";
  
    window.nationalPay = $.extend({}, {
      winWidth: $(window).width(),
      winHeight: $(window).height(),
      winScroll: $(window).scrollTop(),
      preloader: $(".preloader"),
      modalWindow: $(".modal"),
  
      init: function () {
        nationalPay.initTableDropdown();
        nationalPay.initSupportInfo();
        nationalPay.initUploadPhoto();
        nationalPay.initCustomSelect();
        nationalPay.initImageDownload();
        nationalPay.initImagePreview();
      },
      initTableDropdown: function () {
        if (!$(".openSortDropdown").length) return false;
  
        let openDropdown = $(".openSortDropdown");
        openDropdown.each(function () {
          $(this).on("click", function () {
            $(this).toggleClass("drop_opened");
            $(this)
              .parent("th")
              .toggleClass("drop_opened");
          });
        });
      },
      initSupportInfo: function () {
        if (!$(".showInfo").length) return false;
        let showInfo = $(".showInfo"),
          hideInfo = $(".hideInfo");
        showInfo.each(function () {
          $(this).on("click", function () {
            $(this).addClass("showInfo__visible");
            $(this).removeClass("transparent");
          });
        });
        hideInfo.each(function (e) {
          $(this).on("click", function (e) {
            $(this)
              .closest(showInfo)
              .removeClass("showInfo__visible");
            $(this)
              .closest(showInfo)
              .addClass("transparent");
            e.stopPropagation();
          });
        });
      },
      initUploadPhoto: function (e) {
        if (!$("#uploadPhoto").length) return false;
        let uploadPhoto = $("#uploadPhoto"),
          hiddenInput = $("#upload");
        $(document).on("click", '#uploadPhoto', function () {
          document.querySelector("input#upload").click();
        });
      },
      initCustomSelect: function () {
        if (!$(".custom_select").length) return false;
        let toggleSelect = $(".toggleSelect"),
          selectOption = $(".selectOption"),
          showOptions = $(".showOptions"),
          hideOptions = $(".hideOptions");
  
        toggleSelect.each(function () {
          $(this).on("click", function () {
            $(this)
              .closest(".custom_select")
              .toggleClass("opened");
          });
        });
        selectOption.each(function () {
          $(this).on("click", function () {
            let newCurrency = $(this).attr("data-currency"),
              prevCurrency = $(this)
                .closest(".custom_select")
                .find(".custom_select__choosen")
                .attr("data-choosen");
  
            $(this)
              .closest(".custom_select")
              .find(".custom_select__choosen")
              .attr("data-choosen", newCurrency);
            $(this).attr("data-currency", prevCurrency);
            $(this)
              .closest(".custom_select")
              .toggleClass("opened");
            refreshItemData($(".custom_select__choosen"));
            refreshItemData($(this));
          });
        });
  
        function refreshItemData(item) {
          item.each(function () {
            if ($(this).attr("data-choosen")) {
              let data = $(this).attr("data-choosen");
              $(this)
                .find("span")
                .html($(this).attr("data-choosen"));
            } else {
              let data = $(this).attr("data-currency");
              $(this)
                .find("span")
                .html($(this).attr("data-currency"));
            }
          });
        }
      },
      initImagePreview() {
        if (!$("#upload").length) return false;
  
        $("#upload").change(function () {
          readURL(this);
          $("#uploadPhoto")
            .find("svg")
            .hide();
          $("#uploadPhoto")
            .find("span")
            .hide();
        });
  
        function readURL(input) {
          if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
              $("#uploadedImage").attr("src", e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
          }
        }
      },
      initImageDownload() {
        $(".uploadFourth").change(function () {
          $(this).parent('.photo-change').find('.download-svg').hide();
          $(this).parent('.photo-change').find('.done-svg').show();
        });
      },
    });
    $(document).ready(function () {
      nationalPay.init();
    });
  })(jQuery);