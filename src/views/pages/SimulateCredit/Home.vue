<template>
	<v-container class="mt-10">

		<v-dialog v-model="isLoading" persistent width="100%" content-class="loader">
			<v-row class="justify-center align-center" style="height: 100%;">
				<v-progress-circular :size="70" color="white" :width="5" indeterminate></v-progress-circular>
			</v-row>
		</v-dialog>

		

		<v-dialog v-model="isOpenTable" persistent max-width="800">
			<v-card class="pa-10 rounded-lg" flat>
				<v-icon color="primary" style="position: absolute; right: 20px; top: 20px;" @click="handleCloseTable">
					mdi-close
				</v-icon>

				<v-row class="mt-4">
					<v-col cols="12">
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
										<td class="text-right">$ {{ item.interest }}</td>
										<td class="text-right">$ {{ item.capital }}</td>
										<td class="text-right">$ {{ item.balance.replace('-', '') }}</td>
										<td class="text-right">$ {{ item.insurance }}</td>
										<td class="text-right font-weight-bold">$ {{ item.quotaTotal }}</td>
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

				<v-col cols="7" class="py-0">
					<p class="text-h4 primary--text mb-0">Simula tu crédito</p>
				</v-col>

				<v-col cols="7">
					<div class="px-5 py-3 rounded-lg d-flex" style="color:#222831; background-color: #e9f7ff">
						<v-icon class="primary--text mr-4">
							mdi-information-outline
						</v-icon>
						<p class="mb-0">
							El monto mínimo a solicitar es de <strong>$500.00</strong> y el máximo de
							<strong>$20.000</strong>
						</p>
					</div>
				</v-col>

				<v-col cols="7">
					<v-row class="flex-column" dense>
						<p class="mb-1" style="color: #9f9ea2;">Monto a solicitar</p>
						<v-text-field class="rounded-lg" label="Ej: $500.00" solo full-width hide-details
							background-color="#f4f4f4" flat v-model="amount"></v-text-field>
					</v-row>
				</v-col>

				<v-col cols="7">
					<v-row class="flex-column" dense>
						<p class="mb-1" style="color: #9f9ea2;">Elige el plazo de tu crédito (meses)</p>
						<v-row active-class="primary--text" class="justify-space-between">
							<v-col v-for="chip in chips" v-bind:key="chip" cols="3">
								<v-chip class="pa-5 justify-center" @click="handleSelectMonth(chip)"
									:color="timeMonth === chip ? 'primary' : ''"
									style="font-size: 25px; height: 100%; width: 100%;background-color:#ffffff;border:1px solid; border-color: #e9e9f2; font-weight: 300">{{
										chip }}</v-chip>
							</v-col>
							<!-- <v-col cols="3">
								<v-text-field class=" rounded-lg" label="Otro" solo full-width hide-details
									background-color="#ffffff" flat
									style="font-size: 25px; height: 70px; width: 150px;background-color:#ffffff;border:1px solid; border-color: #9f9ea2;"></v-text-field>
							</v-col> -->
						</v-row>
					</v-row>
				</v-col>

				<v-col cols="7">
					<v-row class="flex-column" dense>
						<p class="mb-1" style="color: #9f9ea2;">Tipo de cuota</p>
						<v-row active-class="primary--text" class="justify-space-between">
							<v-col v-for="chipQuote in chipsQuote" v-bind:key="chipQuote.id" cols="6">
								<v-chip class="pa-5 justify-center" @click="handleSelectQuote(chipQuote)"
									:color="typeQuote?.id === chipQuote.id ? 'primary' : ''"
									style="font-size: 20px; height: 100%; width: 100%;background-color:#ffffff;border:1px solid; border-color: #e9e9f2; font-weight: 300;">{{
										chipQuote.label }}</v-chip>
							</v-col>
						</v-row>
					</v-row>
				</v-col>

				<v-col cols="7" v-if="showTable">
					<v-row class="align-center flex-column">
						<v-col cols="12">
							<v-card class="rounded-lg pa-5" flat style="background-color: #f4f5ff;">
								<v-row class="justify-center" dense>
									<v-col cols="12">
										<p class="mb-0 primary--text font-weight-regular text-center">Cuota mensual a
											pagar
										</p>
									</v-col>
									<v-col cols="12">
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

				<v-col cols="7" v-if="showErrorForm">
					<v-alert color="error" text type="error">
						{{ messageAlert || 'Completa todos los campos para continuar' }}
					</v-alert>
				</v-col>

				<v-col cols="7">
					<v-row class="justify-center">
						<v-col cols="6">
							<Button :text="showTable ? 'Limpiar' : 'Regresar'" :isText="true"
								:click="showTable ? handleClearForm : () => { $router.push('/inicio') }" />
						</v-col>
						<v-col cols="6">
							<Button :text="showTable ? 'Ver tabla de amortización' : 'Simular'"
								:click="showTable ? handleOpenTable : simulateCredit" />
						</v-col>
					</v-row>
				</v-col>

			</v-row>
		</v-card>

	</v-container>
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
		chips: [
			"12",
			"24",
			"48",
			"Otro"
		],
		chipsQuote: [
			{
				id: "CUOTA FIJA",
				label: "Fija (Francesa)"
			},
			{
				id: "CUOTA VARIABLE",
				label: "Variable (Alemana)"
			}
		],
		amount: null,
		timeMonth: null,
		typeQuote: null,
		showErrorForm: false,
		messageAlert: '',
		showTable: false,
		dataCredit: null,
		isLoading: false
	}),
	methods: {
		handleCloseTable() {
			this.isOpenTable = false;
		},
		handleOpenTable() {
			this.isOpenTable = true;
		},
		handleClearData() {
			this.messageAlert = ''
			this.showErrorForm = false
			this.showTable = false
			this.dataCredit = false
		},
		handleClearForm() {
			this.handleClearData()
			this.amount = null
			this.timeMonth = null
			this.typeQuote = null
		},
		async simulateCredit() {
			try {
				this.messageAlert = ''
				this.showErrorForm = false
				this.showTable = false
				this.dataCredit = false
				if (!this.amount || !this.timeMonth || !this.typeQuote) {
					this.showErrorForm = true
					return
				}

				const body = {
					quota: this.typeQuote.id,
					amount: this.amount,
					term: this.timeMonth
				}
				this.isLoading = true
				const dataFetch = await fetch('http://54.211.53.237:4000/api/credit/simulate', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(body)
				});
				this.isLoading = false
				const response = await dataFetch.json();
				const { success, data, message } = response
				if (!success) {
					this.showErrorForm = true
					this.messageAlert = message
					return
				}
				this.showTable = true
				this.dataCredit = data

			} catch (error) {
				this.messageAlert = 'Ocurrió un error intente nuevamente,ente mas tarde'
				this.showErrorForm = true
			}
		},
		handleSelectMonth(month) {
			if (this.showTable) { this.handleClearData() }
			this.timeMonth = month;
		},
		handleSelectQuote(quote) {
			if (this.showTable) { this.handleClearData() }
			this.typeQuote = quote;
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