<script lang="ts" setup>
import AppLogo from './AppLogo.vue';
import UserCart from './UserCart.vue';
import UserFavorites from './UserFavorites.vue';
import UserProfile from './UserProfile.vue';

</script>

<template>
    <header class="flex justify-between border-b border-slate-300 px-8 py-8">
        <AppLogo />
        <div class='flex items-center gap-10'>
            <UserCart />
            <UserFavorites />
            <UserProfile />
        </div>
    </header>
</template>

<style scoped></style>