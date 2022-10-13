/**
 * vertigo - application development platform
 *
 * Copyright (C) 2013-2022, Vertigo.io, team@vertigo.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.vertigo.quarto.plugins.exporter.ods;

import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.Map;

import com.github.miachm.sods.Borders;
import com.github.miachm.sods.Color;
import com.github.miachm.sods.Range;
import com.github.miachm.sods.Sheet;
import com.github.miachm.sods.SpreadSheet;
import com.github.miachm.sods.Style;

import io.vertigo.core.lang.Assertion;
import io.vertigo.core.lang.BasicTypeAdapter;
import io.vertigo.core.locale.MessageText;
import io.vertigo.datamodel.smarttype.SmartTypeManager;
import io.vertigo.datamodel.smarttype.definitions.SmartTypeDefinition;
import io.vertigo.datamodel.structure.definitions.DtField;
import io.vertigo.datamodel.structure.model.DtObject;
import io.vertigo.datastore.entitystore.EntityStoreManager;
import io.vertigo.quarto.exporter.model.Export;
import io.vertigo.quarto.exporter.model.ExportField;
import io.vertigo.quarto.exporter.model.ExportSheet;
import io.vertigo.quarto.impl.exporter.util.ExporterUtil;

/**
 * Export ODS.
 * Uses SODS.
 *
 * @author oboitel, npiedeloup
 */
final class ODSExporter {
	private static final int MAX_COLUMN_WIDTH = 50;

	private static final double MM_SIZE_PER_CELL = 4;
	private static final double MM_SIZE_PER_LETTER = 1.8;

	private final Map<DtField, Map<Object, String>> referenceCache = new HashMap<>();
	private final Map<DtField, Map<Object, String>> denormCache = new HashMap<>();

	/*private final Map<BasicType, Style> evenStyleCache = new EnumMap<>(BasicType.class);
	private final Map<BasicType, Style> oddStyleCache = new EnumMap<>(BasicType.class);*/

	private final EntityStoreManager entityStoreManager;
	private final SmartTypeManager smartTypeManager;
	private final Map<Class, BasicTypeAdapter> exportAdapters;

	/**
	 * Constructor.
	 * @param storeManager Store manager
	 */
	ODSExporter(final EntityStoreManager entityStoreManager, final SmartTypeManager smartTypeManager) {
		Assertion.check()
				.isNotNull(entityStoreManager)
				.isNotNull(smartTypeManager);
		//-----
		this.entityStoreManager = entityStoreManager;
		this.smartTypeManager = smartTypeManager;
		exportAdapters = smartTypeManager.getTypeAdapters("export");
	}

	/**
	 * Méthode principale qui gère l'export d'un tableau vers un fichier ODS.
	 *
	 * @param documentParameters Paramètres du document à exporter
	 * @param out Flux de sortie
	 * @throws IOException Io exception
	 */
	void exportData(final Export documentParameters, final OutputStream out) throws IOException {
		// Workbook
		final boolean forceLandscape = Export.Orientation.Landscape == documentParameters.orientation();
		final SpreadSheet spreadSheet = new SpreadSheet();
		//initHssfStyle(spreadSheet);
		int sheetNum = 0;
		for (final ExportSheet exportSheet : documentParameters.sheets()) {
			final String title = exportSheet.getTitle();
			final Sheet sheet = title == null ? new Sheet("" + (char) ('A' + sheetNum)) : new Sheet(title);
			spreadSheet.addSheet(sheet, sheetNum);
			exportData(exportSheet, sheet, forceLandscape);
			sheetNum++;
		}
		spreadSheet.save(out);
	}

	private static Style getHeaderCellStyle() {
		final Style style = new Style();
		style.setBold(true);
		style.setFontSize(10);
		style.setBorders(new Borders(true));
		style.setVerticalTextAligment(Style.VERTICAL_TEXT_ALIGMENT.Middle);
		style.setTextAligment(Style.TEXT_ALIGMENT.Center);
		style.setBackgroundColor(new Color("#999999"));
		return style;
	}

	private static Style getRowCellStyle(final boolean odd) {
		final Style style = new Style();
		style.setBold(false);
		style.setFontSize(10);
		style.setBorders(new Borders(true));
		style.setVerticalTextAligment(Style.VERTICAL_TEXT_ALIGMENT.Middle);
		style.setTextAligment(Style.TEXT_ALIGMENT.Center);
		style.setBackgroundColor(odd ? new Color("#FFFFFF") : new Color("#CFCFCF"));
		return style;
	}

	/**
	 * Réalise l'export des données de contenu et de la ligne d'en-tête.
	 *
	 * @param parameters Paramètre de cet export
	 * @param spreadSheet Document excel
	 * @param sheet Feuille Excel
	 * @param forceLandscape Indique si le parametrage force un affichage en paysage
	 */
	private void exportData(final ExportSheet parameters, final Sheet sheet, final boolean forceLandscape) {
		// Column width
		final Map<Integer, Double> maxWidthPerColumn = new HashMap<>();
		if (parameters.hasDtObject()) {
			exportObject(parameters, sheet, maxWidthPerColumn);
		} else {
			exportList(parameters, sheet, maxWidthPerColumn);
		}
		// On definit la largeur des colonnes:
		int cellIndex;
		for (final Map.Entry<Integer, Double> entry : maxWidthPerColumn.entrySet()) {
			cellIndex = entry.getKey();
			final Double maxLength = entry.getValue();
			final int usesMaxLength = (int) Math.min(maxLength.doubleValue(), MAX_COLUMN_WIDTH);
			sheet.setColumnWidth(cellIndex, MM_SIZE_PER_CELL + usesMaxLength * MM_SIZE_PER_LETTER);
		}
	}

	private void exportList(final ExportSheet parameters, final Sheet sheet, final Map<Integer, Double> maxWidthPerColumn) {
		// exporte le header
		sheet.appendRows(parameters.getDtList().size() + 1);
		sheet.appendColumns(parameters.getExportFields().size());

		int cellIndex = 0;
		for (final ExportField exportColumn : parameters.getExportFields()) {
			final Range cell = sheet.getRange(0, cellIndex);
			final String displayedLabel = exportColumn.getLabel().getDisplay();
			cell.setValue(displayedLabel);
			cell.setStyle(getHeaderCellStyle());
			updateMaxWidthPerColumn(displayedLabel, 1.2, cellIndex, maxWidthPerColumn); // +20% pour les majuscules
			cellIndex++;
		}

		int rowIndex = 1;
		for (final DtObject dto : parameters.getDtList()) {
			cellIndex = 0;
			Object value;
			for (final ExportField exportColumn : parameters.getExportFields()) {
				final Range cell = sheet.getRange(rowIndex, cellIndex);
				value = ExporterUtil.getValue(entityStoreManager, smartTypeManager, exportAdapters, referenceCache, denormCache, dto, exportColumn);
				putValueInCell(smartTypeManager, value, cell, getRowCellStyle(rowIndex % 2 == 0), cellIndex, maxWidthPerColumn, exportColumn.getDtField().getSmartTypeDefinition());

				cellIndex++;
			}
			rowIndex++;
		}
	}

	private void exportObject(final ExportSheet parameters, final Sheet sheet, final Map<Integer, Double> maxWidthPerColumn) {
		final int labelCellIndex = 0;
		final int valueCellIndex = 1;
		final DtObject dto = parameters.getDtObject();
		Object value;
		int rowIndex = 0;
		for (final ExportField exportColumn : parameters.getExportFields()) {
			sheet.appendRow();

			final Range cell = sheet.getRange(rowIndex, labelCellIndex);
			final LocaleMessageText label = exportColumn.getLabel();
			cell.setValue(label.getDisplay());
			cell.setStyle(getHeaderCellStyle());
			updateMaxWidthPerColumn(label.getDisplay(), 1.2, labelCellIndex, maxWidthPerColumn); // +20% pour les majuscules

			final Range valueCell = sheet.getRange(rowIndex, valueCellIndex);
			value = ExporterUtil.getValue(entityStoreManager, smartTypeManager, exportAdapters, referenceCache, denormCache, dto, exportColumn);
			putValueInCell(smartTypeManager, value, valueCell, getRowCellStyle(false), valueCellIndex, maxWidthPerColumn, exportColumn.getDtField().getSmartTypeDefinition());
			rowIndex++;
		}

	}

	private static void putValueInCell(
			final SmartTypeManager smartTypeManager,
			final Object value,
			final Range cell,
			final Style rowCellStyle,
			final int cellIndex,
			final Map<Integer, Double> maxWidthPerColumn,
			final SmartTypeDefinition smartTypeDefinition) {
		String stringValueForColumnWidth;
		cell.setStyle(rowCellStyle);
		if (value != null) {
			stringValueForColumnWidth = String.valueOf(value);
			cell.setValue(value);
			if (value instanceof Double) {
				final Double dValue = (Double) value;
				stringValueForColumnWidth = String.valueOf(Math.round(dValue.doubleValue() * 100) / 100D);
			} else if (value instanceof BigDecimal) {
				final BigDecimal bigDecimalValue = (BigDecimal) value;
				stringValueForColumnWidth = String.valueOf(Math.round(bigDecimalValue.doubleValue() * 100) / 100D);
			} else if (value instanceof Boolean) {
				final Boolean bValue = (Boolean) value;
				cell.setValue(smartTypeManager.valueToString(smartTypeDefinition, bValue));
			} else if (value instanceof LocalDate) {
				// sans ce style "date" les dates apparaîtraient au format
				// "nombre"
				stringValueForColumnWidth = "DD/MM/YYYY";
				// ceci ne sert que pour déterminer la taille de la cellule, on a pas besoin de la vrai valeur
			} else if (value instanceof Instant) {
				final Instant instantValue = (Instant) value;
				cell.setValue(LocalDateTime.ofInstant(instantValue, ZoneId.of("UTC")));
				stringValueForColumnWidth = "DD/MM/YYYY HH:mm";
				// ceci ne sert que pour déterminer la taille de la cellule, on a pas besoin de la vrai valeur
			} else {
				//All DataType supported
			}
			updateMaxWidthPerColumn(stringValueForColumnWidth, 1, cellIndex, maxWidthPerColumn); // +20% pour les majuscules
		}
	}

	private static void updateMaxWidthPerColumn(final String value, final double textSizeCoeff, final int cellIndex, final Map<Integer, Double> maxWidthPerColumn) {
		// Calcul de la largeur des colonnes
		final double newLenght = value != null ? value.length() * textSizeCoeff + 2 : 0; // +textSizeCoeff% pour les majuscules, et +2 pour les marges
		final Double oldLenght = maxWidthPerColumn.get(cellIndex);
		if (oldLenght == null || oldLenght.doubleValue() < newLenght) {
			maxWidthPerColumn.put(cellIndex, newLenght);
		}
	}

}
