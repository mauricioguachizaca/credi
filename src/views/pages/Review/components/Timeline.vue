<template>
	<v-container>
		<v-card elevation="4" class="rounded-lg">
			<v-row class="pa-4 justify-center">
				<v-col cols="10">
					<template>
						<v-timeline :dense="$vuetify.breakpoint.smAndDown">
							<v-timeline-item icon="mdi-check" color="green lighten-2" fill-dot right>
								<span slot="opposite">Validado</span>
								<v-card>
									<v-card-title style="background-color: #5d6fff">
										<h7 class="text-h7 white--text font-weight-light">
											Registro y Autenticación
										</h7>
									</v-card-title>
									<v-container>
										<v-row>
											<v-col class="caption" cols="12" md="10">
												El sistema Tikee verifica su autenticidad e ingresa su solicitud
											</v-col>
											<v-col class="hidden-sm-and-down text-right" md="2">
												<v-icon size="32" color="#5d6fff">
													mdi-face-recognition
												</v-icon>
											</v-col>
										</v-row>
									</v-container>
								</v-card>
							</v-timeline-item>
							<v-timeline-item icon="mdi-check" color="green lighten-2" fill-dot left>
								<span slot="opposite">Validado</span>
								<v-card>
									<v-card-title style="background-color: #5d6fff">
										<h7 class="text-h7 white--text font-weight-light">
											Verificación
										</h7>
									</v-card-title>
									<v-container>
										<v-row>
											<v-col class="caption" cols="12" md="10">
												Su crédito se somete a una evaluación de acuerdo a sus ingresos
											</v-col>
											<v-col class="hidden-sm-and-down text-right" md="2">
												<v-icon size="32" color="#5d6fff">
													mdi-calendar-text
												</v-icon>
											</v-col>
										</v-row>
									</v-container>
								</v-card>
							</v-timeline-item>
							<v-timeline-item icon="mdi-help" color="warning lighten-2" fill-dot rigth>
								<span slot="opposite">Pendiente</span>
								<v-card>
									<v-card-title class="secondary">
										<h7 class="text-h7 white--text font-weight-light">
											Agente de crédito
										</h7>
									</v-card-title>
									<v-container>
										<v-row>
											<v-col class="caption" cols="12" md="10">
												El agente de crédito encargado revisa la información y se contacta en
												caso
												de ser necesario.
											</v-col>
											<v-col class="hidden-sm-and-down text-right" md="2">
												<v-icon size="32" color="secondary">
													mdi-badge-account
												</v-icon>
											</v-col>
										</v-row>
									</v-container>
								</v-card>
							</v-timeline-item>
							<v-timeline-item icon="mdi-help" color="warning lighten-2" fill-dot left>
								<span slot="opposite">Pendiente</span>
								<v-card>
									<v-card-title class="secondary">
										<h7 class="text-h7 white--text font-weight-light">
											Decisión
										</h7>
									</v-card-title>
									<v-container>
										<v-row>
											<v-col class="caption" cols="12" md="10">
												Se aprueba el prestamo y se realiza la acreditación
											</v-col>
											<v-col class="hidden-sm-and-down text-right" md="2">
												<v-icon size="32" color="secondary">
													mdi-cash-100
												</v-icon>
											</v-col>
										</v-row>
									</v-container>
								</v-card>
							</v-timeline-item>


						</v-timeline>
					</template>
				</v-col>
				<v-col cols="7">
					<v-row class="justify-center">
						<v-col cols="6">
							<Button text="Regresar" :click="cancel" />
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-card>


	</v-container>

</template>
<script>
import Button from '@/components/Button.vue'

export default {
	name: 'Identification',
	data: () => ({
		valid: true,
		loading: false,
		snackbar: false,
		snackbarColor: 'default',
		otp: '',
		text: '',
		expectedOtp: '133707',
	}),
	components: {
		Button
	},
	methods: {
		cancel() {
			this.$emit('success', 1)
		},
		validate() {
			this.$refs.form.validate() && this.$emit('success', 2)
		},
		reset() {
			this.$refs.form.reset()
		},
		resetValidation() {
			this.$refs.form.resetValidation()
		},
		onFinish(rsp) {
			this.loading = true
			setTimeout(() => {
				this.loading = false
				this.snackbarColor = (rsp === this.expectedOtp) ? 'success' : 'warning'
				this.text = `OTP procesado con "${rsp}"`
				this.snackbar = true;
				(rsp === this.expectedOtp) && setTimeout(() => { this.$emit('success', 3) }, 1000)
			}, 3500)
		},
	},
}
</script>
<style scoped>
.position-relative {
	position: relative;
}
</style>