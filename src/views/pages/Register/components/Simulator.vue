<template>
	<v-row class="mt-10">
		<v-dialog v-model="isLoading" persistent width="100%" content-class="loader">
			<v-row class="justify-center align-center" style="height: 100%;">
				<v-progress-circular :size="70" color="white" :width="5" indeterminate></v-progress-circular>
			</v-row>
		</v-dialog>

		<v-dialog v-model="isOpenTable" persistent max-width="800" cols="18" xs="5" sm="12" md="17" lg="12" xl="12">
			<v-card class="pa-10 rounded-lg" flat>
				<v-icon color="primary" style="position: absolute; right: 20px; top: 20px;" @click="handleCloseTable">
					mdi-close
				</v-icon>
				<v-row class="mt-4">
					<v-col cols="18" sm="12" md="17" lg="12" xl="12">
						<v-col class="text-h4 justify-center text-center" cols="15" lg="12">
							Tabla de Amortización
						</v-col>
						<v-row class="text-center justify-center mb-1">
							<v-col class="ml-4" cols="8" sm="3" md="3" lg="3" xl="3">Tasa de interes: {{ dataCredit?.tea
								}}</v-col>
							<v-col class="ml-4" cols="8" sm="3" md="3" lg="3" xl="3">Total insurece: {{
			dataCredit?.totalInsurance }}</v-col>
							<v-col class="ml-4" cols="8" sm="3" md="3" lg="3" xl="3">Insurece: {{ dataCredit?.insurance
								}}</v-col>
						</v-row>
						<v-simple-table>
							<template v-slot:default>
								<thead>
									<tr class="rounded-lg" style="background: #5d6fff;">
										<th class="text-center white--text">
											Nro. cuota
										</th>
										<th class="text-center white--text">
											Interés
										</th>
										<th class="text-center white--text">
											Capital
										</th>
										<th class="text-center white--text">
											Saldo
										</th>
										<th class="text-center white--text">
											Seguro Dsgv.
										</th>
										<th class="text-center white--text">
											Pago total
										</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item, index) in dataCredit['amortization']" :key="index"
										:style="[index % 2 !== 0 && { 'background': '#f4f5ff' }]">
										<td>{{ item.period }}</td>
										<td class="text-center">$ {{ item.interest }}</td>
										<td class="text-center">$ {{ item.capital }}</td>
										<td class="text-center">$ {{ item.balance.replace('-', '') }}</td>
										<td class="text-center">$ {{ item.insurance }}</td>
										<td class="text-center font-weight-bold">$ {{ item.quotaTotal }}</td>
									</tr>
								</tbody>
							</template>
						</v-simple-table>
					</v-col>
				</v-row>
				<v-card-actions>
					<v-row class="justify-center">
						<v-col cols="6">
							<Button text="Cerrar" :click="handleCloseTable" />
						</v-col>
					</v-row>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-card elevation="4" class="rounded-lg">

			<v-row class="pa-4 justify-center">
				<v-col cols="10" sm="8" md="7" lg="7" xl="7" class="py-0">
					<p class="text-h4 primary--text mb-0">Simula tu crédito</p>
				</v-col>
				<v-col cols="12" sm="8" md="7" lg="7" xl="7">
					<div class="px-5 py-3 rounded-lg d-flex" style="color:#222831; background-color: #e9f7ff">
						<v-icon class="primary--text mr-4">mdi-information-outline</v-icon>
						<p class="mb-0">El monto mínimo a solicitar es de <strong>$500.00</strong> y el máximo de
							<strong>$20.000</strong>
						</p>
					</div>
				</v-col>
				<v-col cols="12" sm="8" md="7" lg="7" xl="7">
					<v-row class="flex-column" dense>
						<p style="color: #9f9ea2;">Monto a solicitar</p>
						<v-text-field class="rounded-lg" label="Ej: $500.00" solo full-width background-color="#f4f4f4"
							flat v-model="amount" :rules="montoRules" type="text"
							@keypress="handleKeyPressAmount"></v-text-field>
					</v-row>
				</v-col>
				<v-col cols="12" sm="8" md="7" lg="7" xl="7">
					<div class="px-5 py-3 rounded-lg d-flex" style="color:#222831; background-color: #e9f7ff">
						<v-icon class="primary--text mr-4">mdi-information-outline</v-icon>
						<p class="mb-0">El plazo mínimo a solicitar es de <strong>12 meses</strong> y el máximo de
							<strong>88
								meses</strong>
						</p>
					</div>
				</v-col>


				<v-col cols="11" xxl="7" xl="7" lg="7" md="7" sm="8" xs="4">
					<!-- Cambia a 12 columnas en dispositivos móviles y 6 en pantallas medianas -->
					<v-row class="flex-column" dense>
						<p class="mb-1" style="color: #9f9ea2;">Elige el plazo de tu crédito (meses)</p>
						<v-row active-class="primary--text" class="justify-space-between">
							<v-col v-for="chip in chips" v-bind:key="chip" cols="6" xxl="8" sm="3" lg="3" md="3" xs="5">
								<!-- Cambia a 6 columnas en dispositivos móviles -->
								<v-chip class="pa-5 justify-center" @click="handleSelectMonth(chip)"
									:color="timeMonth === chip ? 'primary' : ''" :disabled="isTextFieldFocused"
									style="font-size: 20px; height: 100%; width: 100%; background-color:#ffffff;border:1px solid; border-color: #e9e9f2; font-weight: 300; ">
									{{ chip }}
								</v-chip>
							</v-col>
							<v-col cols="6" xxl="8" md="3" sm="3" lg="3" xl="3" xs="5">
								<!-- Cambia a 6 columnas en dispositivos móviles -->
								<v-text-field class="rounded-lg text-center align-center align-items" label="Otros" solo
									flat full-width v-model="otroPlazo" :rules="plazoRules" hide-details
									@focus="handleTextFieldFocus" @blur="handleTextFieldBlur"
									@input="handleInputOtroPlazo" @keypress="handleKeyPressAmount"
									style="font-size: 20px; height: 103; width: 100%;background-color:#ffffff;border:1px solid; border-color: #e9e9f2; font-weight: 300; text-align: center;"></v-text-field>
							</v-col>
						</v-row>
					</v-row>
				</v-col>

				<v-col cols="11" sm="8" md="7" lg="7" xl="7">
					<v-row class="flex-column" dense>
						<p class="mb-1" style="color: #9f9ea2;">Tipo de cuota</p>
						<v-row active-class="primary--text" class="justify-start">
							<v-col v-for="chipQuote in chipsQuote" v-bind:key="chipQuote.id" cols="12" sm="12" md="6"
								lg="6" xl="6">
								<v-chip class="pa-5 justify-center" @click="handleSelectQuote(chipQuote)"
									:color="typeQuote?.id === chipQuote.id ? 'primary' : ''"
									style="font-size: 20px; height: 100%; width: 100%;background-color:#ffffff;border:1px solid; border-color: #e9e9f2; font-weight: 300;">
									{{ chipQuote.label }}
								</v-chip>
							</v-col>
						</v-row>
					</v-row>

				</v-col>
				<v-col cols="11" sm="8" md="7" lg="7" xl="7" v-if="showTable">
					<v-row class="align-center flex-column">
						<v-col cols="12">
							<v-card class="rounded-lg pa-5" flat style="background-color: #f4f5ff;">
								<v-row class="justify-center" dense>
									<v-col cols="12">
										<p class="mb-0 primary--text font-weight-regular text-center">Cuota mensual a
											pagar</p>
									</v-col>
									<v-col cols="12" sm="6" md="4" lg="4" xl="3">
										<p class="mb-0 font-weight-bold text-center"
											style="color:#222831;font-size: 30px;">
											${{ dataCredit['amortization'][0]['quotaTotal'] }}
										</p>
									</v-col>
								</v-row>
							</v-card>
						</v-col>
					</v-row>
				</v-col>



				<v-col cols="12" sm="8" md="7" lg="7" xl="7" v-if="showErrorForm">
					<v-alert color="error" text type="error">
						{{ messageAlert || 'Completa todos los campos para continuar' }}
					</v-alert>
				</v-col>




				<v-col cols="11 mt-5 mb-12" sm="8" md="7" lg="7" xl="7">
					<v-row class="justify-space-between align-center " grid-List-md>
						<v-row class="justify-center">
							<v-col cols="12" sm="6" md="6" lg="6" xl="6">
								<Button :text="showTable ? 'Limpiar' : 'Regresar'" :isText="true"
									:click="showTable ? handleClearForm : () => { $router.push('/inicio') }" />
							</v-col>
							<v-col cols="12" sm="6" md="6" lg="6" xl="6">
								<Button :text="showTable ? 'Ver tabla de amortización' : 'Simular'"
									:click="showTable ? handleOpenTable : simulateCredit" />
							</v-col>
							<v-col cols="12" sm="6" md="6" lg="6" xl="6" class="justify-center align-center" v-if="showTable">
								<!-- Código existente omitido -->
								<Button color="primary" :click="handleAgregarBoton" text="Continuar" class="mt-2  justify-center align-center">
								</Button>
							</v-col>
						</v-row>


					</v-row>
				</v-col>
			</v-row>
		</v-card>
	</v-row>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
	name: "Home",
	components: {
		Button
	},
	data: () => ({
		isOpenTable: false,
		otroPlazo: '',
		chips: ["12", "24", "48"],
		chipsQuote: [
			{ id: "CUOTA FIJA", label: "Fija (Francesa)" },
			{ id: "CUOTA VARIABLE", label: "Variable (Alemana)" }
		],
		amount: '',
		montoRules: [
			v => !!v || 'Campo requerido',
			v => /^\d+(\.\d{1,2})?$/.test(v) || 'Solo se permiten números',
			v => v >= 500 || 'El monto mínimo a solicitar es de $500.00',
			v => v <= 20000 || 'El monto máximo a solicitar es de $20.000'
		],
		plazoRules: [
			v => /^\d+$/.test(v) || 'Solo se permiten números',
			v => v >= 12 || 'El plazo mínimo es de 12 meses',
			v => v <= 88 || 'El plazo máximo es de 88 meses'
		],
		timeMonth: null,
		typeQuote: null,
		showErrorForm: false,
		messageAlert: '',
		showTable: false,
		dataCredit: null,
		isLoading: false,
		isTextFieldFocused: false,
		mostrarBoton: false
	}),
	methods: {
		handleCloseTable() { this.isOpenTable = false; },
		handleOpenTable() { this.isOpenTable = true; },
		handleClearData() {
			this.messageAlert = '';
			this.showErrorForm = false;
			this.showTable = false;
			this.dataCredit = false;
		},
		handleClearForm() {
			this.handleClearData();
			this.amount = null;
			this.timeMonth = null;
			this.typeQuote = null;
			this.otroPlazo = null;
		},
		async simulateCredit() {
			try {
				this.handleClearData();
				if (!this.amount || (!this.timeMonth && !this.otroPlazo) || !this.typeQuote) {
					this.showErrorForm = true;
					return;
				}

				const isValidAmount = this.montoRules.every(rule => rule(this.amount) === true);
				if (!isValidAmount) {
					this.showErrorForm = true;
					this.messageAlert = 'El monto ingresado no cumple con las reglas establecidas';
					setTimeout(() => {
						this.showErrorForm = false;
						this.messageAlert = '';
					}, 5000);
					return;
				}

				const body = {
					quota: this.typeQuote.id,
					amount: this.amount,
					term: this.timeMonth || this.otroPlazo
				};
				this.isLoading = true;
				const dataFetch = await fetch('http://20.84.48.225:5008/api/credit/simulate', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(body)
				});
				this.isLoading = false;
				const response = await dataFetch.json();
				const { success, data, message } = response;
				if (!success) {
					this.showErrorForm = true;
					this.messageAlert = message;
					return;
				}
				this.showTable = true;
				this.dataCredit = data;
				this.showTable = true;
				this.mostrarBoton = true;
			} catch (error) {
				this.messageAlert = 'Ocurrió un error, inténtelo nuevamente más tarde';
				this.showErrorForm = true;
			}
		},
		handleKeyPressAmount(event) {
			const KeyCode = event.keyCode;
			const value = event.target.value;

			if (
				((KeyCode < 48 || KeyCode > 57) && KeyCode !== 46) || // Permitir solo números y el punto decimal
				(value.includes('.') && KeyCode === 46) || // Permitir solo un punto decimal
				(value.indexOf('.') !== -1 && value.substring(value.indexOf('.') + 1).length >= 4) // Permitir solo dos dígitos después del punto decimal
			) {
				event.preventDefault();
				this.$toast.error('Solo se permiten números y un máximo de dos dígitos después del punto decimal');
			}
		},


		handleSelectMonth(chip) {
			if (this.isTextFieldFocused) return;
			if (this.showTable) this.handleClearData();
			if (this.timeMonth === chip) {
				this.timeMonth = null;
				this.otroPlazo = '';
			} else {
				this.timeMonth = chip;
				this.otroPlazo = '';
				this.chips.forEach(item => {
					if (item !== chip) {
						this[`selected${item}`] = false;
					}
				});
			}
		},
		handleSelectQuote(quote) {
			if (this.isTextFieldFocused) return;
			if (this.showTable) this.handleClearData();
			this.typeQuote = quote;
			this.chips.forEach(item => {
				this[`selected${item}`] = false;
			});
		},
		handleAgregarBoton() {
			this.$emit('success', 4)
		},
		handleTextFieldFocus() {
			this.isTextFieldFocused = true;
		},
		handleTextFieldBlur() {
			this.isTextFieldFocused = false;
		},
		handleInputOtroPlazo() {
			this.timeMonth = null;
		}
	}
}
</script>

<style>
.v-data-table__wrapper {
	border-radius: 10px;
}

.loader {
	margin: 0;
	height: 100%;
	width: 100%;
	max-height: 100% !important;
}
</style>