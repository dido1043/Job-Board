# Build stage
FROM maven:3.8.4-openjdk-17 AS build

WORKDIR /app

COPY pom.xml ./
COPY .env .env
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM openjdk:17-jdk-slim

WORKDIR /app
COPY --from=build /app/target/Job-Board-0.0.1-SNAPSHOT.jar .

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "Job-Board-0.0.1-SNAPSHOT.jar"]
