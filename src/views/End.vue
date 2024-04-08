<template>
	<div>
		<v-row justify="center">
			<v-col rows="2" class="mt-10 mb-10" md="5" sm="5" xs="5">

				<v-img alt="hola avatar" :src="homeImage" height="auto" width="500px" />

			</v-col>
			<v-col rows="2" style="text-align: justify;" class="mt-10 mb-10" md="3" sm="5" xs="5">
				<h2 class="mt-5 initial primary--text">¡Tu solicitud de crédito ingresó con éxito!</h2><br />

				<body-1>Recibimos tu solicitud de crédito por $2.000.00. Luego de analizar tu capacidad de endeudamiento
					te enviaremos una respuesta en las próximas te enviaremos una respuesta en las próximas 48 horas.
				</body-1><br />
				<body-1>
					Estos son los detalles de tú solicitud :
				</body-1>
				<row style="text-align: center;">
					<p><br /> <b class="primary--text">Monto solicitado</b> <br />$2.000.00 </p>
					<p> <b class="primary--text">Número de solicitud</b><br /> 1105490819</p>
					<p> <b class="primary--text">Fecha de solicitud</b><br /> 02/12/2022 </p>
					<p> <b class="primary--text">Código personal de seguimiento de crédito </b><br />
						120293847729202890129</p>
				</row>
			</v-col>
		</v-row>
		<v-row class="justify-center">
			<v-col cols="2">
				<Button text="Regresar" :click="() => { $router.push('/inicio') }" />
			</v-col>
		</v-row>

	</div>
</template>
<script>
import { mdiAccount } from '@mdi/js'
import { mdiCardAccountDetailsOutline } from '@mdi/js';
import homeImg from '@/assets/img/process-complete.svg'
import dniImg from '@/assets/img/card.png'
import netImg from '@/assets/img/freelance.png'
import camImg from '@/assets/img/web-cam.png'
import mapImg from '@/assets/img/map.png'
import Button from '@/components/Button.vue';
export default {
	name: 'Home',
	data: () => ({
		loader: null,
		loading4: false,
		homeImage: homeImg,
		arrayTargets: [
			{
				title: 'CÉDULA ACTUALIZADA',
				subtitle: 'Código Dactilar',
				img: dniImg
			},
			{
				title: 'INTERNET ESTABLE',
				subtitle: 'Chrome, Safari',
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
	components: {
		Button
	},
	watch: {
		loader() {
			const l = this.loader
			this[l] = !this[l]

			setTimeout(() => (this[l] = false, this.$router.push('/registro')), 3000)

			this.loader = null
		},
	},
}
</script>
<style>
.initial {
	text-align: center;
}

.img_pincipal2 {
	border-radius: 10px;
	border-width: 1px;
	max-height: 500px;
}

.custom-loader {
	animation: loader 1s infinite;
	display: flex;
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