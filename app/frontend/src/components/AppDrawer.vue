<script setup lang="ts">
import CartProduct from './CartProduct.vue';
</script>

<template>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70">
    </div>
    <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8 flex flex-col flex-1 justify-between">
        <div class=" flex items-center gap-5 mb-10">
            <img class="cursor-pointer opacity-30 rotate-180 hover:opacity-100 transition" alt="arrow"
                src="/public/arrow-back.svg" />
            <h2 class="text-2xl font-bold">Корзина</h2>
        </div>
        <div class="flex flex-col flex-1 justify-between overflow-auto">
            <div class="flex flex-col gap-5">
                <CartProduct title="Мужские Кроссовки Nike Blazer Mid Suede" price="1000"
                    img="/sneakers/sneakers-1.jpg" />
                <CartProduct title="Мужские Кроссовки Nike Blazer Mid Suede" price="2000"
                    img="/sneakers/sneakers-2.jpg" />
                <CartProduct title="Мужские Кроссовки Nike Blazer Mid Suede" price="3000"
                    img="/sneakers/sneakers-3.jpg" />

            </div>
        </div>
        <div>
            <div class="flex flex-col gap-5">
                <div class="flex items-end gap-2">
                    <span>Итого:</span>
                    <div class="flex-1 border-b border-dashed" />
                    <span class="font-bold">1000 руб.</span>
                </div>

                <div class="flex items-end gap-2">
                    <span>Налог 5%:</span>
                    <div class="flex-1 border-b border-dashed" />
                    <span class="font-bold">50 руб.</span>
                </div>
            </div>

            <button
                class="flex justify-center items-center gap-3 w-full py-3 mt-10 bg-lime-500 text-white rounded-xl transition active:bg-lime-700 hover:bg-lime-600">
                Оформить заказ
                <img src="/arrow-next.svg" alt="Arrow" />
            </button>
        </div>
    </div>
</template>