// mobile MENU FUNCIONALIDADES

document.addEventListener("DOMContentLoaded", ()=>{
    const mobileMenuBtn = document.getElementById("mobile-menu-btn")
    const navbar = document.querySelector(".navbar")

    // Criação do menu mobile

    const mobileMenu = document.createElement("div")
    mobileMenu = className = "mobile-menu"
    mobileMenu.innerHTML `
    <div class="mobile-menu-content">
      <a href="#features" class="mobile-menu-link">Recursos</a>
      <a href="#specs" class="mobile-menu-link">Especificações</a>
      <a href="#pricing" class="mobile-menu-link">Preços</a>
      <a href="#contact" class="btn-primary mobile-menu-cta">Comprar Agora</a>
    </div>
  `


  // estilo menu mobile
  const mobileMenuStyles = `
    .mobile-menu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(10px);
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        z-index: 999;
    }

    .mobile-menu-active{
    display: block;
    }

    .mobile-menu-content{
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    }

    .mobile-menu-link{
    color: #d1d5db
    text-decoration: none;
    padding: 8px 0;
    transition: color 0.3s ease;
    }
    .mobile-menu-link:hover{
        color: #ffffff;
    }
    .mobile-menu-cta{
        margin-top: 16px;
    }
        @media(min-width: 769px){
        .mobile-menu{
            display: none !important;
        }
    }
  `
    // adicionando styles

    const styleSheet = document.createElement("style")
    styleSheet.textContent = mobileMenuStyles
    document.head.appendChild(styleSheet)

    navbar.appendChild(mobileMenu)

    let isMenuOpen = false

    mobileMenuBtn.addEventListener("click", ()=>{
        isMenuOpen = !isMenuOpen

        if(isMenuOpen){
            mobileMenu.classList.add("active")
            mobileMenuBtn.classList.add("active")
        } else {
            mobileMenu.classList.remove("active")
            mobileMenuBtn.classList.remove("active")
        }
    })


    // fechar menu mobile quando clicar nos links

    mobileMenu.addEventListener("click", (e)=>{
        if(e.target.classList.contains("mobile-menu-links") || e.target.classList.contains("mobile-menu-cta")) {
            isMenuOpen = false
            mobileMenu.classList.remove("active")
            mobileMenuBtn.classList.remove("active")
        }
    })
})


// rolando pelas ancoras dos links

document.addEventListener("DOMContentLoaded", ()=>{
    const anchorLinks = document.querySelectorAll('a[href^="#"]')

    anchorLinks.forEach((anchor)=>{
        anchor.addEventListener("click", function(e){
            e.preventDefault()
            const targetId = this.getAttribute("href")
            const targetElement = document.querySelector(targetId)

            if(targetElement){
                const offsetTop = targetElement.offsetTop - 80 

                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth",
                })
            }
        })
    })
})


//animações de scroll

const createScrollObserver=() =>{
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if(entry.isIntersecting){
                entry.target.classList.add("animate-in")
            }
        })
    }, observerOptions)

    // estilo de animações

    const animationStyles= `
    .scroll-animate{
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    .scroll-animate.animate-in{
    opacity: 1;
    transform: translateY(0)
    }
    `

    const styleSheet = document.createElement("style")
    styleSheet.textContent = animationStyles
    document.head.appendChild(styleSheet)

    // aplicar classe de animações nos elementos

    const animateElement = document.querySelectorAll(".feature-card, .stat-item, .spec-item, .pricing-card")
    animateElement.forEach((el)=>{
        el.classList.add("scroll-animate")
        observer.observe(el)
    })
}


// card hover effects


const addHoverEffects = ()=>{
    const featureCards = document.querySelectorAll(".feature-card")

    featureCards.forEach((card)=>{
        card.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-8px)"
            this.style.boxShadow = "0 20px 40px rgba(0,0,0, 0.4)"
        })

        card.addEventListener("mouseleave", function(){
            this.style.transform = "translateY(0)"
            this.style.boxShadow = ""
        })
    })
}


// navbar background mudando conforme o scroll

const handleNavbarScroll = () => {
    const navbar = document.querySelector(".navbar")

    window.addEventListener("scroll", ()=>{
        if (window.scrollY > 50){
            navbar.style.background = "rgba(0,0,0, 0.95)"
        } else {
            navbar.style.background = "rgba(0,0,0, 0.8)"
        }
    })
}


// animação de contagem

const animateCounters = ()=>{
    const statsSection = document.querySelector(".stats")
    let hasAnimated= false

    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if(entry.isIntersecting && !hasAnimated) {
                hasAnimated = true 

                const statNumbers = document.querySelectorAll(".stat-number")
                statNumbers.forEach((stat)=>{
                    const text= stat.textContent
                    const number = Number.parseInt(text.match(/\d+/))

                    if(number){
                        let current = 0
                        const increment = number / 60 
                        const suffix = text.replace(/\d+/, "")

                        const timer = setInterval(() =>{
                            current += increment
                            if(current >= number) {
                                stat.textContent = number + suffix
                                clearInterval(timer)
                            } else {
                                stat.textContent = Math.floor(current) + suffix
                            }
                        }, 16)
                    }
                })
            }
        })
    }, 
    {threshold: 0.5}, 
    )

    if(statsSection){
        observer.observe(statsSection)
    }
}


// parallax effects

const addParallaxEffect = ()=>{
    const hero = document.querySelector(".hero")
    window.addEventListener("scroll", ()=>{
        const scrolled = window.pageYOffset
        const rate = scrolled * -0.3

        if(hero) {
            hero.style.transform = `translateY(${rate}px)`
        }
    })
}

// interação com animação 

const addWatchInteraction = ()=>{
    const watchContainer=document.querySelector(".watch-container")

    if(watchContainer){
        watchContainer.addEventListener("mouseenter", function (){
            this.style.animationPlayState = "paused"
            this.style.transform = "translateY(-10px) scale(1.05)"
        })

        watchContainer.addEventListener("mouseleave", function () {
            this.style.animationPlayState = "running"
            this.style.transform = ""
        })
    }
}


// animação da pagina de carregamento

const addLoadingAnimation = () =>{
    window.addEventListener("load", ()=>{
        document.body.style.opacity ="0"
        document.body.style.transition = "opacity 0.5s ease-in-out"

        setTimeout (()=>{
            document.body.style.opacity ="1"
        }, 100)
    })
}



// inicializar todas as funcionalidades!!// 

document.addEventListener("DOMContentLoaded", () => {
  createScrollObserver()
  addHoverEffects()
  handleNavbarScroll()
  animateCounters()
  addParallaxEffect()
  addWatchInteraction()
  addLoadingAnimation()

})