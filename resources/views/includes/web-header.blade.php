<nav class="navbar navbar-expand-lg navbar-light bg fixed" style="padding:0 10px">
     <div class="container">
      <a class="navbar-brand"  href="/"><img src="{{ asset('images/logo.png') }}" class="w-20 w-40"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
       <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
         <a class="nav-link bg-nfont" href="/">Home <span class="sr-only">(current)</span></a>
       </li>
       <li class="nav-item">
         <a class="nav-link" href="#"> <?php echo $username;?></a>
       </li>
      
     </ul>
   </div>
 </div>
</nav> 