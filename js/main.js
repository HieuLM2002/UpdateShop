function Validator(options) {
  let getParent = (inputElement, selector) => {
    while (inputElement.parentElement) {
      if (inputElement.parentElement.matches(selector)) {
        return inputElement.parentElement;
      }
      inputElement = inputElement.parentElement;
    }
  };
  let selectorRules = {};
  let validate = (inputElement, rule) => {
    let errorElement = getParent(
      inputElement,
      options.formGroupSelector
    ).querySelector(options.errorSelector);
    let errMessage;
    let rules = selectorRules[rule.selector];
    for (let i = 0; i < rules.length; i++) {
      switch (inputElement.type) {
        case "radio":
        case "checkbox":
          errMessage = rules[i](
            formElement.querySelector(rule.selector + ":checked")
          );
          break;
        default:
          errMessage = rules[i](inputElement.value);
      }
      if (errMessage) break;
    }
    if (errMessage) {
      errorElement.innerText = errMessage;
      getParent(inputElement, options.formGroupSelector).classList.add(
        "invalid"
      );
    } else {
      errorElement.innerText = "";
      getParent(inputElement, options.formGroupSelector).classList.remove(
        "invalid"
      );
    }
    return !errMessage;
  };
  let formElement = document.querySelector(options.form);
  formElement.onsubmit = (event) => {
    event.preventDefault();
    let isFormValid = true;
    options.rules.forEach((rule) => {
      let inputElement = formElement.querySelector(rule.selector);
      let isValid = validate(inputElement, rule);
      if (!isValid) {
        isFormValid = false;
      }
    });
    if (isFormValid) {
      if (typeof options.onSubmit === "function") {
        let enableInputs = formElement.querySelectorAll("[name]");
        let formValues = Array.from(enableInputs).reduce((values, input) => {
          switch (input.type) {
            case "radio":
              values[input.name] = formElement.querySelector(
                'input[name="' + input.name + '"]:checked'
              ).value;
              break;
            case "checkbox":
              if (!input.matches(":checked")) return values;

              if (!Array.isArray(values[input.name])) {
                values[input.name] = [];
              }
              values[input.name].push(input.value);
              break;
            case "file":
              values[input.name] = input.files;
            default:
              values[input.name] = input.value;
          }
          return values;
        }, {});
        options.onSubmit(formValues);
      } else {
        formElement.submit();
      }
    }
  };
  if (formElement) {
    options.rules.forEach((rule) => {
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }
      let inputElements = formElement.querySelectorAll(rule.selector);
      Array.from(inputElements).forEach((inputElement) => {
        inputElement.onblur = () => {
          validate(inputElement, rule);
        };
        inputElement.oninput = () => {
          let errorElement = getParent(
            inputElement,
            options.formGroupSelector
          ).querySelector(options.errorSelector);
          errorElement.innerText = "";
          getParent(inputElement, options.formGroupSelector).classList.remove(
            "invalid"
          );
        };
      });
    });
  }
}

Validator.isRequired = (selector, message) => {
  return {
    selector: selector,
    test: (value) => {
      return value ? undefined : message || "Please enter this field!";
    },
  };
};
Validator.isEmail = (selector, message) => {
  return {
    selector: selector,
    test: (value) => {
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value)
        ? undefined
        : message || "Please enter the correct email!";
    },
  };
};
Validator.passwordMinLength = (selector, min, message) => {
  return {
    selector: selector,
    test: (value) => {
      return value.length >= min
        ? undefined
        : message || `Please enter all ${min} characters!`;
    },
  };
};
Validator.isConfirmed = (selector, getConfirmValue, message) => {
  return {
    selector: selector,
    test: (value) => {
      return value === getConfirmValue()
        ? undefined
        : message || "Input value in not precision!";
    },
  };
};
let imgList = ["img1.jpg", "img2.jpg", "img3.jpg"];
let index = 0;
function changeImage() {
  index++;
  if (index == imgList.length) {
    index = 0;
  }
  let img = document.querySelector("body");
  img.style = `background-image : url('../imgs/imgLogin/${imgList[index]}');`;
}
changeImage();
setInterval(changeImage, 3000);
