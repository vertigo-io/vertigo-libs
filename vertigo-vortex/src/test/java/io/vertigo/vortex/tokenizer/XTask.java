package io.vertigo.vortex.tokenizer;

import java.util.Iterator;
import java.util.List;

import io.vertigo.vortex.syntax.SyntaxBuilder;
import io.vertigo.vortex.syntax.SyntaxType;

public class XTask {
	private String taskName;
	private String className;
	private String request;
	//	private List<XTaskAttribute> taskAttributes = new ArrayList<>();
	//
	//	public static class XTaskAttribute {
	//		String name;
	//		String domainName;
	//		String cardinality;
	//
	//		//		public void print() {
	//		//			System.out.println(" name : " + name);
	//		//			System.out.println(" domainName : " + domainName);
	//		//			System.out.println(" cardinality : " + cardinality);
	//		//		}
	//
	//		public XTaskAttribute(Stream<Token> tokens) {
	//			Parser parser = new Parser<XTask>()
	//					.identifier("in").keyword(v -> this.name = v)
	//					.bracket(TokenBracket.LeftCurly)
	//					.keyword("domain").separator().identifier(v -> this.domainName = v)
	//					.pair("cardinality", v -> this.cardinality = v)
	//					.bracket(TokenBracket.RightCurly);
	//			//parser.parse2(tokens);
	//		}
	//	}

	public void print() {
		System.out.println("Task: " + taskName);
		System.out.println(" className : " + className);
		System.out.println(" request: " + request);
		//System.out.println(" attributes : " + taskAttributes);
	}

	private static SyntaxBuilder taskSyntax(XTask task) {
		return new SyntaxBuilder()
				.term("Task").word(v -> task.taskName = v)
				.bracket("{")
				.pair("className", ":", v -> task.className = v)
				.pair("request", ":", v -> task.request = v)
				.bracket("}");
	}

	public static void main(String[] args) {
		final Tokenizer tokenizer = new Tokenizer(List.of(SyntaxType.values()));

		final List<Token> tokens = tokenizer.tokenize(payload2);
		tokens
				.stream()
				.filter(t -> t.type() != SyntaxType.spaces)
				.forEach(t -> System.out.println(t));
		System.out.println("tokens");
		System.out.println("parse");

		final Iterator<Token> tokenIterator = tokens.iterator();
		XTask task = new XTask();

		new TokenParser()
				.parse(taskSyntax(task).getTokenExpecteds(), tokenIterator, SyntaxType.spaces);

		XTask task2 = new XTask();
		new TokenParser()
				.parse(taskSyntax(task2).getTokenExpecteds(), tokenIterator, SyntaxType.spaces);
		task.print();
		task2.print();
	}

	public static String payload = """
			Task TkGetBaseManager {
			    classname : "io.vertigo.basics.task.TaskEngineSelect"
			    request : " select per.*  from mission mis"
			}
			""";

	public static String payload2 = """
			Task TkGetBaseManager {
			    classname : "io.vertigo.basics.task.TaskEngineSelect"
			    request : " select per.*  from mission mis"
			}

			Task TkUser {
			    classname : "io.vertigo.basics.task"
			    request : "select *  from user"
			}
			""";
	//	in 	equipmentId  {domain : DoId  cardinality: "1" }
}

//	create Task TkGetBaseManager {  
//	    className : "io.vertigo.basics.task.TaskEngineSelect"
//	    request : """
//	            select per.*
//	            	from mission mis
//	            	join person per on mis.person_id = per.person_id
//	            	where mis.base_id = #baseId# and mis.role_id= 'MANAG'
//	            	limit 1;
//	             """
//		in 	equipmentId  		{domain : DoId  						cardinality: "1" }
//		in  securedEquipment 	{domain : DoAuthorizationCriteria   	cardinality: "1" }//	}
//	private String className;
//	private String request;
//
