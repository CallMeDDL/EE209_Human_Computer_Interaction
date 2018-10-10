login = $(".login")
signup = $(".sign-up")
forget = $(".forget")
submit = $('.button')
emerald = "#19CC8B"
red = "#BC3E48"
yellow = "#B8B136"
lightGrey = "#515866"
darkGrey = "#2A2D33"

toLogin = ->
  $(".security").addClass("hide")
  $(".full-name, .retype").addClass("ani-hide")
  $(".password, .password div").removeClass("ani-hide")
  login.addClass("selected")
  signup.removeClass("selected")
  emailVerify()
  forget.show()
  login.html("Login")
  signup.html("Sign Up")

toSignup = ->
  passwordSecure()
  $(".full-name, .retype, .password").removeClass("ani-hide")
  signup.addClass("selected")
  login.removeClass("selected")
  emailVerify()
  forget.hide()
  login.html("Login")
  signup.html("Sign Up")

toForget = ->
  $(".full-name, .full-name div, .retype, .retype div, .password, .password div .forget").addClass("ani-hide")
  signup.removeClass("selected")
  login.addClass("selected")
  emailVerify()
  forget.hide()
  login.html("Reset Password")
  signup.html("Back")

emailVerify = ->
  if $(".login").hasClass("selected")
    checkInterval = 0
    myInterval = setInterval (->
      if $(".email .content").val().length >= 18
        $(".profile-img").addClass("profile-pic")
        $(".profile-add").hide()
        clearInterval(myInterval)
      if checkInterval == 250
        clearInterval(myInterval)
      checkInterval++
    ), 250
  else
    $(".profile-add").show()
    $(".profile-img").removeClass("profile-pic")

passwordSecure = ->
  checkInterval = 0
  myInterval = setInterval (->
    value = $(".password .content").val()
    if value.length > 0 && value.length < 4
      color = red
      backFill = red
    else if value.length >= 5 && value.length < 7
      color = yellow
      backFill = yellow
    else if value.length >= 8
      color = emerald
      backFill = emerald
    if value.length > 0
      $(".security").removeClass("hide")
    else
      $(".security").addClass("hide")
    secureVal = value.length * 9
    if secureVal >= 100
      secureVal = 100
    if value.length <= 5
      pie1 = (value.length * 36) + 90
      pieColor = lightGrey
    else if value.length >= 5 && value.length <= 9
      pieColor = color
      pie1 = (value.length * 36) - 90
    else
      secureVal = 90
      pie1 = 270
    $(".secureValue").html(secureVal)
    console.log pie1 + " " + secureVal
    $(".password .content, .password .security-type").css("color", "#{color}")
    $(".circle.background").css("background", "#{backFill}")
    $(".password .fill").css
      background: "linear-gradient(#{pie1}deg, transparent 50%, #{pieColor} 50%), linear-gradient(90deg, #{lightGrey} 50%, transparent 50%)"
    if checkInterval == 250
      clearInterval(myInterval)
    login.click ->
      $(".password .content").css("color", "#fff")
      clearInterval(myInterval)
    checkInterval++
  ), 250

login.click ->
  if !login.hasClass("selected")
    toLogin()

signup.click ->
  if $(".password").hasClass("ani-hide")
    toLogin()
  else if !signup.hasClass("selected")
    toSignup()

submit.click ->
  if $(".password").hasClass("ani-hide")
    $(".text-wrapper").removeClass("show")
    $(".load-gif").addClass("show")
    setTimeout (->
      toLogin()
      $(".text-wrapper").addClass("show")
      $(".load-gif").removeClass("show")
    ), 2500

forget.click ->
  toForget()

$(".password .content").click ->
  if $(".sign-up").hasClass("selected")
    passwordSecure() 

$(".email .content").click =>
  emailVerify()