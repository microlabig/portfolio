<template lang="pug">
    .header
        .container
            .header__wrapper
                .header__logo
                    .header__avatar
                        .avatar
                            .avatar__block                
                                img(src='../../images/content/user.jpg' alt="Аватар").avatar__image
                    .header__block
                        .header__name
                            h1.header__name-title Игорь Безместин
                        .header__text-box
                            .header__typepanel
                                p Панель администрирования
                            .header__quit
                                button(
                                    @click.prevent="logoutUser"
                                    type="button"
                                ).header__quit-link Выйти
</template>

<script>
import {mapActions} from 'vuex';

export default {
    methods: {
        ...mapActions('user',['logout']),
        logoutUser() {
            this.logout();
            this.$router.replace('/login');
        }
    }
}
</script>
