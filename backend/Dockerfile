# Stage 1: Build the application
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app

# Copy Maven wrapper and project definition
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
# Ensure mvnw is executable
RUN chmod +x mvnw
# Resolve dependencies (cached layer)
RUN ./mvnw dependency:resolve

# Copy source code and build
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]