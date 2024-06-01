<script setup>

defineProps({
    title: String,
    img: String,
    price: Number,
    isAdded: Boolean,
    isFavorite: Boolean,
    onClickAdd: Function,
    addToFavoritesList: Function
});

</script>

<template>
    <div
        class="relative flex flex-col w-full border border-slate-100 rounded-xl p-8 cursor-pointer transition hover:shadow-xl hover:transform hover:-translate-y-2">
        <div @click="addToFavoritesList" class="absolute top-8 left-8">
            <img :src="isFavorite ? '/like-2.svg' : '/like-1.svg'" alt="Favorite" loading="lazy"/>
        </div>
        <img :src="img" class="w-full" alt="Sneaker" loading="lazy" />
        <p>{{ title }}</p>
        <div class="flex justify-between mt-5">
            <div class="flex flex-col gap-2">
                <span class="text-slate-200">Цена:</span>
                <span class="font-bold">{{ price }} руб.</span>
            </div>
            <img @click="addToFavoritesList" :src="isAdded ? '/checked.svg' : '/plus.svg'" alt="Plus" loading="lazy"/>
        </div>
    </div>
</template>
