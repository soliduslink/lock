# Solidus Lock Widget fork

This fork of the Auth0 lock widget adds a workaround for the ten field limit in the Auth0 API.

The added capability makes it possible to add a flag isExtra to any additional signup field,
and all fields flagged with isExtra is serialized as JSON into the field extraFields.

This means we now only have nine usable additional signup fields and that the field name
extraFields is reserved.

Unpacking of the extra fields can be done by a rule in Auth0.

## Build
```
> grunt build
> grunt dist
```
