package io.vertigo.quarto;

import io.vertigo.app.config.Feature;
import io.vertigo.app.config.Features;
import io.vertigo.core.param.Param;
import io.vertigo.quarto.impl.services.converter.ConverterManagerImpl;
import io.vertigo.quarto.impl.services.export.ExportManagerImpl;
import io.vertigo.quarto.impl.services.publisher.PublisherManagerImpl;
import io.vertigo.quarto.plugins.converter.openoffice.OpenOfficeLocalConverterPlugin;
import io.vertigo.quarto.plugins.converter.openoffice.OpenOfficeRemoteConverterPlugin;
import io.vertigo.quarto.plugins.converter.xdocreport.XDocReportConverterPlugin;
import io.vertigo.quarto.plugins.export.csv.CSVExporterPlugin;
import io.vertigo.quarto.plugins.export.pdf.PDFExporterPlugin;
import io.vertigo.quarto.plugins.export.rtf.RTFExporterPlugin;
import io.vertigo.quarto.plugins.export.xls.XLSExporterPlugin;
import io.vertigo.quarto.plugins.publisher.docx.DOCXMergerPlugin;
import io.vertigo.quarto.plugins.publisher.odt.OpenOfficeMergerPlugin;
import io.vertigo.quarto.services.converter.ConverterManager;
import io.vertigo.quarto.services.export.ExportManager;
import io.vertigo.quarto.services.publisher.PublisherManager;

public class QuartoFeatures extends Features<QuartoFeatures> {

	public QuartoFeatures() {
		super("vertigo-quarto");
	}

	@Feature("localOpenOfficeConverter")
	public QuartoFeatures withLocalOpenOfficeConverter(final Param... params) {
		getModuleConfigBuilder().addPlugin(OpenOfficeLocalConverterPlugin.class, params);
		return this;
	}

	@Feature("remoteOpenOfficeConverter")
	public QuartoFeatures withRemoteOpenOfficeConverter(final Param... params) {
		getModuleConfigBuilder().addPlugin(OpenOfficeRemoteConverterPlugin.class, params);
		return this;
	}

	@Feature("xDocReportConverter")
	public QuartoFeatures withXDocReportConverter() {
		getModuleConfigBuilder().addPlugin(XDocReportConverterPlugin.class);
		return this;
	}

	@Feature("CSVExporter")
	public QuartoFeatures withCSVExporter() {
		getModuleConfigBuilder().addPlugin(CSVExporterPlugin.class);
		return this;
	}

	@Feature("PDFExporter")
	public QuartoFeatures withPDFExporter() {
		getModuleConfigBuilder().addPlugin(PDFExporterPlugin.class);
		return this;
	}

	@Feature("RTFExporter")
	public QuartoFeatures withRTFExporter() {
		getModuleConfigBuilder().addPlugin(RTFExporterPlugin.class);
		return this;
	}

	@Feature("XLSExporter")
	public QuartoFeatures withXLSExporter() {
		getModuleConfigBuilder().addPlugin(XLSExporterPlugin.class);
		return this;
	}

	@Feature("DOCXPublisher")
	public QuartoFeatures withDOCXPublisher() {
		getModuleConfigBuilder().addPlugin(DOCXMergerPlugin.class);
		return this;
	}

	@Feature("ODTPublisher")
	public QuartoFeatures withODTPublisher() {
		getModuleConfigBuilder().addPlugin(OpenOfficeMergerPlugin.class);
		return this;
	}

	@Override
	protected void buildFeatures() {
		getModuleConfigBuilder()
				.addComponent(ConverterManager.class, ConverterManagerImpl.class)
				.addComponent(ExportManager.class, ExportManagerImpl.class)
				.addComponent(PublisherManager.class, PublisherManagerImpl.class);
	}

}
