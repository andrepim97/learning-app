<template>
    <div class="min-h-screen flex flex-col bg-gray-50">
        <!-- Cabeçalho -->
        <header class="bg-white shadow p-4 flex justify-between items-center">
            <h1 class="text-lg font-semibold">Painel</h1>
            <!-- Espaço para utilizador / logout -->
            <div>Utilizador</div>
        </header>

        <div class="flex flex-1">
            <!-- Barra lateral -->
            <aside class="w-64 bg-white border-r p-4 hidden md:block">
                <nav>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-blue-600 hover:underline">Dashboard</a></li>
                        <li><a href="#" class="text-blue-600 hover:underline">Perfil</a></li>
                        <li><a href="#" class="text-blue-600 hover:underline">Configurações</a></li>
                    </ul>
                </nav>
            </aside>

            <!-- Conteúdo principal -->
            <main class="flex-1 p-6">
                <slot />
            </main>
        </div>
    </div>
</template>

<script setup>
// Layout base para áreas autenticadas
</script>
