<template>
	<v-container>

		<v-dialog v-model="isOpenIndications" persistent max-width="630">
			<v-card class="pa-10 rounded-lg" flat>
				<v-icon color="primary" style="position: absolute; right: 20px; top: 20px;"
					@click="handleCloseIndications">
					mdi-close
				</v-icon>
				<v-row class="justify-center">
					<v-col cols="12 d-flex justify-center">
						<v-img class="mb-5" src="@/assets/img/icon-money.svg" max-height="70px" max-width="70px" />
					</v-col>
					<v-col cols="9">
						<p class="mb-0 primary--text font-weight-bold text-center" style="font-size: 25px;">¡Haz
							realidad
							tus
							sueños con tu crédito en línea!</p>
					</v-col>
				</v-row>
				<v-row class="flex-column">
					<v-col cols="12">
						<p class="mb-0">No olvides tener a mano:</p>
					</v-col>
					<v-col cols="12">
						<v-row>
							<v-col class="d-flex" cols="12" v-for="(item, index) in listIndications" v-bind:key="index">
								<v-icon class="ml-2 mr-4" color="#5d6fff">
									{{ item.icon }}
								</v-icon>
								<p class="mb-0">{{ item.text }}</p>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
				<v-row class="justify-center">
					<v-col cols="6">
						<Button text="Entendido" :click="handleCloseIndications" />
					</v-col>
				</v-row>
			</v-card>
		</v-dialog>

		<v-row class="justify-center">

			<v-col cols="12">
				<v-img class="align-center justify-center ma-auto" :src="homeImage" height="auto" width="500px" />
			</v-col>

			<v-col class="mt-10" cols="12">
				<v-row class="justify-center">
					<v-col cols="auto">
						<v-card id="card-action" class="rounded-lg" flat
							style="border: 1px solid #5d6fff; width: 200px; height: auto; cursor: pointer;"
							@click="() => { $router.push('/revision') }">
							<div class="pa-4">
								<v-row class="justify-center" no-gutters>
									<v-icon color="#5d6fff" x-large>
										mdi-list-box-outline
									</v-icon>
									<v-col class="mt-2" cols="12">
										<p class="mb-0 text-center">Revisa el estado de tu crédito</p>
									</v-col>
								</v-row>
							</div>
						</v-card>
					</v-col>
					<v-col cols="auto">
						<v-card id="card-action" class="rounded-lg" flat
							style="border: 1px solid #5d6fff; width: 200px; height: auto; cursor: pointer;"
							@click="() => { $router.push('/registro') }">
							<div class="pa-4">
								<v-row class="justify-center" no-gutters>
									<v-icon color="#5d6fff" x-large>
										mdi-bank
									</v-icon>
									<v-col class="mt-2" cols="12">
										<p class="mb-0 text-center">Registra tu crédito en línea</p>
									</v-col>
								</v-row>
							</div>
						</v-card>
					</v-col>
					<v-col cols="auto">
						<v-card id="card-action" class="rounded-lg " flat
							style="border: 1px solid #5d6fff; width: 200px; height: auto; cursor: pointer;"
							@click="() => { $router.push('/simulacion') }">
							<div class="pa-4">
								<v-row class="justify-center" no-gutters>
									<v-icon color="#5d6fff" x-large>
										mdi-account-details
									</v-icon>
									<v-col class="mt-2" cols="12">
										<p class="mb-0 text-center">Crea una simulación a tus necesidades</p>
									</v-col>
								</v-row>
							</div>
						</v-card>
					</v-col>
				</v-row>
			</v-col>

			<!-- <v-col cols="12">
				<v-row justify="center">
					<v-col cols="auto">
						<Button text="Revisar mi solicitud" :click="() => { $router.push('/revision') }" />
					</v-col>
					<v-col cols="auto">
						<Button text="Iniciar solicitud de crédito" :click="() => { $router.push('/registro') }" />
					</v-col>
					<v-col cols="auto">
						<Button text="Simulador de crédito" :click="() => { $router.push('/simulacion') }" />
					</v-col>
				</v-row>
			</v-col> -->

		</v-row>

	</v-container>
</template>
<script>
import { mdiAccount } from '@mdi/js'
import { mdiCardAccountDetailsOutline } from '@mdi/js';
import Button from '@/components/Button.vue';

import homeImg from '@/assets/img/credit-illustration.png'
import dniImg from '@/assets/img/card.png'
import netImg from '@/assets/img/freelance.png'
import camImg from '@/assets/img/web-cam.png'
import mapImg from '@/assets/img/map.png'

export default {
	name: 'Home',
	components: {
		Button
	},
	methods: {
		handleCloseIndications() {
			this.isOpenIndications = false;
		}
	},
	data: () => ({
		isOpenIndications: true,
		listIndications: [
			{
				icon: 'mdi-card-account-details-outline ',
				text: 'Número de cédula y código dactilar.',
			},
			{
				icon: 'mdi-map-marker-outline',
				text: 'Permitir acceso a la ubicación por GPS.',
			},
			{
				icon: 'mdi-laptop',
				text: 'Permitir acceso a la cámara de tu computador.',
			},
			{
				icon: 'mdi-application-outline',
				text: 'Navegador compatible (Chrome, Firefox, Edge)',
			}
		],
		loader: null,
		loader1: null,
		loading3: false,
		loading4: false,
		homeImage: homeImg,
		arrayTargets: [
			{
				title: 'CÉDULA ACTUALIZADA',
				subtitle: 'Código Dactilar',
				img: dniImg
			},
			{
				title: 'NAVEGADOR COMPATIBLE',
				subtitle: 'Chrome, Safari, Edge',
				img: netImg
			},
			{
				title: 'UBICACIÓN GPS ACTIVA',
				subtitle: 'Permitir acceso',
				img: mapImg
			},
			{
				title: 'CAMARA WEB',
				subtitle: 'Permitir acceso',
				img: camImg
			},
		],
		icons: {
			mdiCardAccountDetailsOutline,
			mdiAccount
		}
	}),
	watch: {
		loader() {
			const l = this.loader;
			this[l] = !this[l];

			// Verificar si ya estamos en la ruta '/registro' antes de navegar
			if (this.$route.path !== '/registro') {
				setTimeout(() => {
					this[l] = false;
					this.$router.push('/registro');
				}, 3000);
			}

			this.loader = null;
		},
		loader1() {
			const l = this.loader1;
			this[l] = !this[l];

			// Verificar si ya estamos en la ruta '/revision' antes de navegar
			if (this.$route.path !== '/revision') {
				setTimeout(() => {
					this[l] = false;
					this.$router.push('/revision');
				}, 3000);
			}

			this.loader1 = null;
		},
	},
}
</script>
<style>
.initial {
	text-align: center;
}

.img_pincipal {
	border-radius: 10px;
	border: solid;
	border-color: #5D6FFF;
	border-width: 1px;
	max-height: 250px;
}

.custom-loader {
	animation: loader 1s infinite;
	display: flex;
}

#card-action:hover {
	background: #f4f5ff;
}

@-moz-keyframes loader {
	from {
		transform: rotate(0);
	}

	to {
		transform: rotate(360deg);
	}
}

@-webkit-keyframes loader {
	from {
		transform: rotate(0);
	}

	to {
		transform: rotate(360deg);
	}
}

@-o-keyframes loader {
	from {
		transform: rotate(0);
	}

	to {
		transform: rotate(360deg);
	}
}

@keyframes loader {
	from {
		transform: rotate(0);
	}

	to {
		transform: rotate(360deg);
	}
}
</style>