<template>
    <div class="py-16">
        <div class="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
            <div class="hidden lg:block lg:w-1/2 bg-cover"
                style="background-image:url('https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849822_1280.jpg')">
            </div>
            <div class="w-full p-8 lg:w-1/2">
                <h2 class="text-2xl font-semibold text-gray-700 text-center">Brand</h2>
                <div class="mt-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                    <input
                        class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="email" />
                </div>
                <div class="mt-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                    <input
                        class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="number" />
                </div>
                <div class="mt-4">
                    <div class="flex justify-between">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    </div>
                    <input
                        class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="password" />
                </div>
                <div class="mt-4">
                    <div class="flex justify-between">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                    </div>
                    <input
                        class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="password" />
                </div>
                <div class="mt-8">
                    <button
                        class="bg-cyan-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Register</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    auth: "guest",
    data() {
        return {
            form: {
                name: null,
                email: null,
                password: null,
                password_confirmation: null,
                _token: "",
            },
            errors: [],
        };
    },
    mounted() {
        this.$axios.$get("/sanctum/csrf-cookie");
    },
    methods: {
        register() {
            this.$axios
                .post("http://127.0.0.1:8000/register", this.form)
                .then((response) => {
                    this.$router.push({
                        path: "/login",
                    });
                })
                .catch((error) => {
                    this.errors = error.response.data.errors;
                });
        },
    },
};
</script>