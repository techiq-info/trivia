<header class="main-header">

    <!-- Logo -->
    <a href="{{url('admin/dashboard')}}" class="logo">
        <!-- mini logo for sidebar mini 50x50 pixels -->
    <span class="logo-mini"><img src="{{'/images/Logo.jpeg'}}" style="height: 40px;"/></span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg"><img src="{{'/images/Logo.jpeg'}}" style="height: 35px;"/><b>POSP</b></span>
    </a>

    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
            <span class="sr-only">Toggle navigation</span>
        </a>
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
                <!-- User Account: style can be found in dropdown.less -->
                <li class="dropdown user user-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-user-circle-o"></i>
                    </a>
                    <ul class="dropdown-menu">
                        <!-- Menu Footer-->
                        <li class="user-footer">
                            <div class="pull-left">
                                <a href="#" class="btn btn-default btn-flat"><?php echo $username;?></a>
                            </div>
                            <div class="pull-right">
                                <a href="{{url('admin/signout')}}" class="btn btn-default btn-flat">Sign out</a>
                            </div>
                        </li>
                    </ul>
                </li>
                
            </ul>
        </div>

    </nav>
</header>