<script>
    import {Button} from "@svelteuidev/core";
</script>

<main>
    <header>
        <nav class="navbar navbar-expand-lg navbar-custom py-3">
            <div class="container-fluid">
                <a class="navbar-brand d-flex align-items-center fs-4" href="http://localhost:8080">
                    <span>Tafly QR Kod Menü Sistemleri</span>
                </a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul class="navbar-nav fs-5 items">
                        <li class="nav-item">
                            <a class="nav-link item" href="#references">Referanslar</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link item" href="#about">Hakkımızda</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link item" href="#guide">Nasıl Kullanılır?</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link item" href="#pricing">Fiyatlandırma</a>
                        </li>
                    </ul>

                    <div class="auth-links d-lg-none w-100 text-center mt-3">
                        <Button variant="gradient" size="sm" class="w-100 mb-2">
                            Ücretsiz Başla <span class="material-icons ms-2">verified</span>
                        </Button>
                        <Button variant="outline" size="sm" class="w-100">
                            Giriş Yap <span class="material-icons ms-2">login</span>
                        </Button>
                    </div>
                </div>

                <div class="auth-links ms-3 d-none d-lg-flex">
                    <Button variant="gradient" size="sm">
                        Ücretsiz Başla <span class="material-icons ms-2">verified</span>
                    </Button>&nbsp;
                    <Button variant="filled" size="sm">
                        Giriş Yap <span class="material-icons ms-2">login</span>
                    </Button>
                </div>
            </div>
        </nav>
    </header>

    <section class="slider">
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                        aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="https://placehold.co/600x400" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="https://placehold.co/600x400" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="https://placehold.co/600x400" class="d-block w-100" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </section>
</main>

<style>
    .navbar {
        background-color: #E3F2FD;
    }

    .item {
        transition-duration: 0.5s;
        transition-timing-function: ease-out;
        color: #6c757d;
    }

    .item:hover {
        color: #0D6EFD;
    }

    .slider {
        margin-top: 20px;
        height: 800px;
    }
</style>
