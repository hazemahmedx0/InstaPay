/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 
 */
function mobDetect() {
  var userAgent = window.navigator.userAgent,
    platform =
      window.navigator?.userAgentData?.platform || window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (/Linux/.test(platform)) {
    os = "Linux";
  }

  return os;
}

let mob = mobDetect();

//

// Browser detect

let browserName = "c";

const fnBrowserDetect = () => {
  let userAgent = navigator.userAgent;

  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = "chrome";
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = "firefox";
  } else if (userAgent.match(/safari/i)) {
    browserName = "safari";
  } else if (userAgent.match(/opr\//i)) {
    browserName = "opera";
  } else if (userAgent.match(/edg/i)) {
    browserName = "edge";
  } else {
    browserName = "No browser detection";
  }
};

fnBrowserDetect();

if (browserName == "safari" || mob == "iOS") {
  var elems = document.querySelectorAll(".scrollanimation");

  [].forEach.call(elems, function (el) {
    el.classList.remove("scrollanimation");
  });
} else {
  function scrollObserver(e, o) {
    let s = 0,
      r = new IntersectionObserver((e) => {
        e.forEach((e) => {
          window.requestIdleCallback(() => {
            o?.once
              ? 0 === s &&
                e.isIntersecting &&
                (e.target.classList.add("shown"), o.onshow && o.onshow(e), s++)
              : e.isIntersecting
              ? (e.target.classList.add("shown"), o && o.onshow && o.onshow(e))
              : (e.target.classList.remove("shown"),
                o && o.onhide && o.onhide(e));
          });
        });
      }, o);
    function n(e) {
      document.querySelectorAll(e).forEach((e) => r.observe(e));
    }
    Array.isArray(e) ? e.forEach(n) : n(e);
  }
  scrollObserver(".scrollanimation");
}

let dropdowns = document.querySelectorAll(".navbar .dropdown-toggler");
let dropdownIsOpen = false;

// Handle dropdown menues
if (dropdowns.length) {
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (event) => {
      let target = document.querySelector(`#${event.target.dataset.dropdown}`);

      if (target) {
        if (target.classList.contains("show")) {
          target.classList.remove("show");
          dropdownIsOpen = false;
        } else {
          target.classList.add("show");
          dropdownIsOpen = true;
        }
      }
    });
  });
}

// Handle closing dropdowns if a user clicked the body
window.addEventListener("mouseup", (event) => {
  if (dropdownIsOpen) {
    dropdowns.forEach((dropdownButton) => {
      let dropdown = document.querySelector(
        `#${dropdownButton.dataset.dropdown}`
      );
      let targetIsDropdown = dropdown == event.target;

      if (dropdownButton == event.target) {
        return;
      }

      if (!targetIsDropdown && !dropdown.contains(event.target)) {
        dropdown.classList.remove("show");
      }
    });
  }
});

// Open links in mobiles
function handleSmallScreens() {
  document.querySelector(".navbar-toggler").addEventListener("click", () => {
    let navbarMenu = document.querySelector(".navbar-menu");

    if (!navbarMenu.classList.contains("active")) {
      navbarMenu.classList.add("active");
    } else {
      navbarMenu.classList.remove("active");
    }
  });
}

handleSmallScreens();
