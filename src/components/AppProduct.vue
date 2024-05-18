<script setup>

defineProps({
    title: String,
    img: String,
    price: String,
    isAdded: Boolean,
    isFavorite: Boolean,
    onClickAdd: Function,
    onClickFavorite: Function
});

</script>

<template>
    <div
        class="relative flex flex-col w-full border border-slate-100 rounded-xl p-8 cursor-pointer transition hover:shadow-xl hover:transform hover:-translate-y-2">
        <div @click="onClickFavorite" class="absolute top-8 left-8">
            <img :src="isFavorite ? '/like-2.svg' : '/like-1.svg'" alt="Favorite" />
        </div>
        <img :src="img" class="w-full" alt="Sneaker" loading="lazy" />
        <p>{{ title }}</p>
        <div class="flex justify-between mt-5">
            <div class="flex flex-col gap-2">
                <span class="text-slate-200">Цена:</span>
                <span class="font-bold">{{ price }} руб.</span>
            </div>
            <img @click="onClickFavorite" :src="isAdded ? '/checked.svg' : '/plus.svg'" alt="Plus" />
        </div>
    </div>
</template>
