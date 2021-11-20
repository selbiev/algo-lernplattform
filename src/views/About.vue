<template>
  <div class="about">
    <router-link :to="{name: 'Home'}" >
      <button class="btn_info">
        <img src="../assets/icons/home.png" /><br>
        Startseite
      </button>
    </router-link>

    <h1>Impressum</h1>
    Diese Lernumgebung wurde für das Lehrmittel 'Einfach Informatik 3/4' erstellt. <br> <br> <br> <br>
    <img src="../assets/beaver_transport.png" /> <br> <br> <br>
    Entwickler: Said Elbiev <br> <br>

    <div style="font-size: 14px; ">All graphics are under licence by <i>Klett und Balmer Verlag</i> &copy; 2021</div>
      <div style="font-size: 13px">Home icon made by
        <a href="https://www.freepik.com" title="Freepik" target="_blank">Freepik</a> and
        <a href="https://www.flaticon.com/authors/vignesh-oviyan" title="Vignesh Oviyan" target="_blank">Vignesh Oviyan</a>
        respectively from <a href="https://www.flaticon.com/" target="_blank">www.flaticon.com</a>
      </div>
      <div style="font-size: 13px">Help and check icon by
        <a href="https://freeicons.io/profile/726" target="_blank">Free Preloaders</a> and
        <a href="https://freeicons.io/profile/714" target="_blank">Raj Dev</a>
        respectively on <a href="https://freeicons.io" target="_blank">freeicons.io</a>
      </div>
      <div style="font-size: 13px">Info, go back, refresh and skip icon by
        <a href="https://freeicons.io/profile/3" target="_blank">icon king1</a>,
        on <a href="https://freeicons.io" target="_blank">freeicons.io</a>
      </div> <br>
      <div style="font-size: 14px;">
        Many Design decisions were inspired by the <a href="https://itsmedario.github.io/">learning platform</a> made by Dario Näpfer. Thank you Dario!
      </div>
    </div> <br><br><br><br>
    <hr style="height: 0.5px; width: 70%; border-width: 0px; color: black; background-color: black; margin: auto;">

    <div class="logos" style="padding: 30px 0 0 0;">
      <img src="../assets/abz-web-logo.png" style="height: 60px; width: auto; position: absolute; right: 20%" />
      <img src="../assets/ethz-logo.svg" style="height: 40px; width: auto; position: absolute; left: 20%" />
    </div> <br><br><br><br><br>
</template>

<style>
  body{
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }

  .btn_home {
    margin: 5px 13px 0 0;
    cursor: pointer;
    min-height: 60px;
    min-width: 60px;
    background-color: #ffe5b2;
    border-radius: 10px;
    border: solid black;
    border-width: thin;
    position: absolute;
    top: 0px;
    right: 0px;
  }

  .btn_home:hover {
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 90%);
  }

</style>