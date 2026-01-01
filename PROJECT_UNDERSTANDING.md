# Project Architecture and Coding Standards

This document outlines the standard structure and best practices for developing features in the `myalternates-frontend` application. Adhering to these guidelines ensures consistency, maintainability, and scalability.

## 1. Directory Structure

We follow a **Feature-Based / Domain-Driven** directory structure. Each feature is self-contained within its own directory in `src/modules/`.

### Standard Module Layout

For a module named `FeatureName` (e.g., `Users`, `Schemes`):

```
src/modules/admin/pages/FeatureName/
├── api/                  # RTK Query endpoints
│   └── featureNameApi.ts
├── components/           # Module-specific UI components
│   ├── FeatureNameModal.tsx
│   ├── FeatureNameTable.tsx
│   └── FeatureNameFilter.tsx
├── hooks/                # Custom hooks for logic & data fetching
│   └── useFeatureName.ts
├── schema/               # Zod validation schemas
│   └── featureNameSchema.ts
├── types/                # TypeScript interfaces
│   └── featureName.ts
└── FeatureName.tsx       # Main page component
```

### Shared Resources

Common utilities and components used across multiple modules are located in `src/shared/`.

*   `src/shared/components/`: Reusable UI components (Buttons, Inputs, Modals, Tables).
*   `src/shared/hooks/`: Generic hooks (e.g., `useAsyncMutation`, `useToast`).
*   `src/shared/types/`: Global types (e.g., `PaginatedResponse`, `ApiError`).
*   `src/shared/services/`: Core services (e.g., `rtkService`, `baseService`).

## 2. Coding Patterns

### Data Fetching (RTK Query)

*   **Location:** `api/featureNameApi.ts`
*   **Pattern:** Use `RtkQueryService.enhanceEndpoints().injectEndpoints()`.
*   **Tags:** Always define `providesTags` for queries and `invalidatesTags` for mutations to ensure automatic cache updates.
*   **Naming:** Use descriptive names like `getUsers`, `createUser`, `updateUser`.

### Types

*   **Location:** `types/featureName.ts`
*   **Structure:**
    *   `Entity`: The main interface matching the backend model (e.g., `User`, `Scheme`).
    *   `CreateEntityPayload`: Data required to create an item.
    *   `UpdateEntityPayload`: Data required to update an item.
    *   `EntityFilters`: Query parameters for listing (search, pagination).
    *   `Response Types`: Use generics `SingleResponse<T>` and `PaginatedResponse<T>`.

### Validation (Zod)

*   **Location:** `schema/featureNameSchema.ts`
*   **Usage:** Define Zod schemas for forms. Export the schema and the inferred type.
    ```typescript
    export const UserSchema = z.object({ ... });
    export type UserSchemaType = z.infer<typeof UserSchema>;
    ```

### Custom Hooks (Logic Layer)

*   **Location:** `hooks/useFeatureName.ts`
*   **Purpose:** Encapsulate mutation logic, error handling, and toast notifications using `useAsyncMutation`.
*   **Pattern:**
    ```typescript
    export const useFeatureName = () => {
      const { execute } = useAsyncMutation();
      const [createMutation] = useCreateFeatureMutation();

      const handleCreate = useCallback((data) =>
        execute(createMutation, data, {
          successMessage: 'Created successfully!',
          errorMessage: 'Failed to create',
        }), [createMutation, execute]);

      return { handleCreate };
    };
    ```

### UI Components

*   **Modals:** Should handle form submission and error mapping.
    *   Use `useForm` with `zodResolver`.
    *   Use `DynamicFormField` for inputs.
    *   Handle API errors using `setFormErrors` in the `catch` block.
*   **Tables:** Should accept data and actions (edit/delete) as props.
    *   Use shared `Table` components from `@shared/components/ui/table`.
*   **Pages:** The main entry point (e.g., `FeatureName.tsx`).
    *   Orchestrates state (search, pagination, modal visibility).
    *   Calls the API query hook.
    *   Renders `ComponentCard`, `Filter`, `Table`, `Pagination`, and `Modal`.

### Error Handling

*   **Global:** `useAsyncMutation` handles global API errors and toasts automatically.
*   **Form Validation:** API validation errors (`400 Bad Request`) are passed back to the form component and mapped to specific fields using `setFormErrors`.

## 3. Creating a New Module Checklist

1.  [ ] Define **Types** mirroring the backend schema.
2.  [ ] Create **API** slice with CRUD endpoints.
3.  [ ] Define **Zod Schema** for form validation.
4.  [ ] Create **Custom Hook** to wrap mutations with `useAsyncMutation`.
5.  [ ] Create **Modal** component for Create/Edit forms.
6.  [ ] Create **Table** component to display data.
7.  [ ] Create **Filter** component for search/filtering.
8.  [ ] Assemble everything in the **Main Page** component.
9.  [ ] Register the route in `src/modules/admin/config/routes.ts`.
10. [ ] Add to navigation in `src/modules/admin/config/navigation.ts`.

## NOTE: USE EXISTING COMPONENENTS,ICONS,THEME,etc FOR BUILDING UI
## NOTE: DON'T BREAK THE THEME AND FOLLOW THE STRUCTURE PROPERLY.

---
